import pandas as pd
from pymongo import MongoClient
import spacy
import warnings
from fuzzywuzzy import fuzz

RECOMMENDATION_COUNT = 20

warnings.filterwarnings("ignore")

nlp = spacy.load("en_core_web_sm")


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


def get_user_movies_with_weights(user_id):  # limit to 10 sorted by importance
    return moviesData.head(10)


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


def compute_points(row, important_movies):
    # Compute points for this row based on all the user watched movies
    weights = {
        "genre": 50,
        "IMDB_Rating": 0.1,
        "votes": 0.000001,
        "title": 100,
    }
    genre_similarity = 0
    important_movies.apply(lambda model_row : genre_similarity += compute_genre_similarity(row, model_row))
    genre_similarity /= len(important_movies)
    title_similarity = 0
    important_movies.apply(lambda model_row : title_similarity += compute_title_similarity(row, model_row))
    title_similarity /= len(important_movies)

    points = (
        weights["genre"] * genre_similarity
        + weights["IMDB_Rating"] * row["IMDB_Rating"]
        + weights["votes"] * row["noOfVotes"]
        + weights["title"] * title_similarity
    )
    return points


def get_personal_recommendations(user_id):
    global moviesData
    user_movies = get_user_movies_with_weights(user_id)
    important_movies = user_movies.head(min(len(user_movies), 10))
    moviesData["points"] = moviesData.apply(
        lambda row: compute_points(row, important_movies) * important_movies["weights"], axis=1
    ) # at most quadratic * title and genre similarity
    moviesData = moviesData.sort_values(by="points", ascending=False)
    return moviesData.head(RECOMMENDATION_COUNT)
