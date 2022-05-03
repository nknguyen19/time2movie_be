from urllib import response
import pandas as pd
from pymongo import MongoClient
import spacy
import warnings
from fuzzywuzzy import fuzz

warnings.filterwarnings("ignore")

nlp = spacy.load("en_core_web_sm")

RECOMMENDATION_COUNT = 5
HOST = "http://localhost:3000"


def input_csv(fileName):
    df = pd.read_csv(fileName, encoding="utf-8", header=0)
    return df


def connect_mongo(host, username, password, db):
    """A util for making a connection to mongo"""

    if username and password:
        mongo_uri = "mongodb+srv://%s:%s@%s/%s" % (username, password, host, db)
        conn = MongoClient(mongo_uri)
    else:
        conn = MongoClient(host)
    return conn[db]


def import_mongo(
    db,
    collection,
    query={},
    host="localhost",
    port=27017,
    username=None,
    password=None,
    no_id=True,
    no_version=True,
):
    # Connect to MongoDB
    db = connect_mongo(host, username=username, password=password, db=db)

    # Make query to DB and Collection
    cursor = db[collection].find(query)

    # Delete _id from dataframe if no_id is True
    df = pd.DataFrame(list(cursor))
    if no_id:
        del df["_id"]
    if no_version:
        del df["__v"]
    return df


moviesData = import_mongo(
    "cs422",
    "movies",
    host="time2movie.kuhyb.mongodb.net/cs422?retryWrites=true&w=majority",
    username="cs422",
    password="time2movie",
    no_id=False,
)

# print(moviesData.columns)
# print(moviesData.head(10))

moviesTitles = list(moviesData["title"])
# print(moviesTitles)
genres = list(moviesData["gerne"].unique())
temp_genres = []
for genre in genres:
    temp_genres.extend(genre.split(","))
genres = list(set(temp_genres))
# print(genres)


def compute_title_similarity(row, model_row):
    current_title = str(row["title"])
    model_title = str(model_row["title"])
    current_title = nlp(current_title)
    model_title = nlp(model_title)
    similarity = current_title.similarity(model_title)
    return similarity


def compute_genre_similarity(row, model_row):
    # TODO: FIX TYPO IN COLUMN NAME GERNE TO GENRE
    current_genre = str(row["gerne"]).split(",")
    model_genre = str(model_row["gerne"]).split(",")

    similarity = 0
    for genre in current_genre:
        if genre in model_genre:
            similarity += 1
        else:
            similarity -= 0.2

    for genre in model_genre:
        if genre not in current_genre:
            similarity -= 0.1

    return similarity


def compute_overview_similarity(row, model_row):
    current_overview = str(row["overview"])
    model_overview = str(model_row["overview"])
    current_overview = nlp(current_overview)
    model_overview = nlp(model_overview)
    similarity = current_overview.similarity(model_overview)
    return similarity


def compute_points(row, model_row):
    # Compute points for each movie
    weights = {
        "genre": 50,
        "overview": 100,
        "IMDB_Rating": 0.1,
        "votes": 0.000001,
        "title": 100,
    }
    genre_similarity = compute_genre_similarity(row, model_row)
    overview_similarity = compute_overview_similarity(row, model_row)
    title_similarity = compute_title_similarity(row, model_row)

    points = (
        weights["genre"] * genre_similarity
        + weights["overview"] * overview_similarity
        + weights["IMDB_Rating"] * row["IMDB_Rating"]
        + weights["votes"] * row["noOfVotes"]
        + weights["title"] * title_similarity
    )
    return points


def assign_points(model_row, moviesData):
    moviesData["points"] = moviesData.apply(
        lambda row: compute_points(row, model_row), axis=1
    )


def extract_movie_title(movieTitle):
    mx_point = 0
    ans = "The Godfather"
    for title in moviesTitles:
        point = fuzz.partial_ratio(movieTitle, title)
        if point > mx_point:
            mx_point = point
            ans = title
    return ans, mx_point


def convert_title_to_ref_tag(title, id):
    return "<a href='" + HOST + "/movie/" + str(id) + "'>" + str(title) + "</a>"


def get_recommendation_by_title(movieTitle, moviesData):

    movieTitle, confidence = extract_movie_title(movieTitle)
    # print("recommendation for: " + movieTitle, "points: ", confidence)

    if confidence < 70:
        return "Sorry, I don't know what you mean. Try again."

    global RECOMMENDATION_COUNT
    RECOMMENDATION_COUNT = min(RECOMMENDATION_COUNT, len(moviesData))
    # Get the row containing the movie
    row = moviesData.loc[moviesData["title"] == movieTitle]

    if row.empty:
        return "Sorry, I don't know what you mean. Try again."

    row = row.squeeze()
    assign_points(row, moviesData)

    # Sort the movies by points
    sorted_movies = moviesData.sort_values(by="points", ascending=False)
    moviesData.drop(columns=["points"], inplace=True)
    sorted_movies.drop(columns=["points"], inplace=True)
    sorted_movies.drop(
        sorted_movies.loc[sorted_movies["title"] == movieTitle].index, inplace=True
    )
    response = "Here are my recommendations for " + movieTitle + ":<br>"
    for i in range(min(RECOMMENDATION_COUNT, len(sorted_movies))):
        response += convert_title_to_ref_tag(
            sorted_movies.iloc[i]["title"], sorted_movies.iloc[i]["_id"]
        )
        response += "<br>"

    return response


def extract_movie_genre(movieGenre):
    mx_point = 0
    ans = "Action"
    for genre in genres:
        point = fuzz.partial_ratio(movieGenre, genre)
        if point > mx_point:
            mx_point = point
            ans = genre
    return ans, mx_point


def get_recommendation_by_genre(genre, moviesData):
    genre, confidence = extract_movie_genre(genre)
    # print("Recommendation for: " + genre, "points: ", confidence)

    if confidence < 60:
        return "Sorry, I don't know what you mean. Try again."

    recommendation = moviesData.loc[moviesData["gerne"].str.contains(genre)]
    recommendation = recommendation.sort_values(by="IMDB_Rating", ascending=False)

    response = "Here are my recommendations for " + genre + ":<br>"
    for i in range(min(RECOMMENDATION_COUNT, len(recommendation))):
        response += convert_title_to_ref_tag(
            recommendation.iloc[i]["title"], recommendation.iloc[i]["_id"]
        )
        response += "<br>"

    return response


def get_random_recommendation(moviesData):
    rec = moviesData.sample(RECOMMENDATION_COUNT)
    response = "Here are my recommendations for you:<br>"
    for i in range(RECOMMENDATION_COUNT):
        response += convert_title_to_ref_tag(rec.iloc[i]["title"], rec.iloc[i]["_id"])
        response += "<br>"
    return response


# while True:
#     movieTitle = input("Enter a movie title: ")
#     if movieTitle == "exit":
#         break
#     recommendation = get_recommendation_by_title(movieTitle, moviesData)
#     if recommendation is None:
#         continue
#     print(recommendation)
