import title_comparator
import spacy
import data

nlp = spacy.load("en_core_web_sm")
RECOMMENDATION_COUNT = 5
HOST = "http://localhost:3000"

moviesData = data.moviesdf.copy(deep=True)

reviewsData = data.reviewsdf.copy(deep=True)
commentsData = data.commentsdf.copy(deep=True)

moviesTitles = list(moviesData["title"])
genres = list(moviesData["gerne"].unique())
temp_genres = []
for genre in genres:
    temp_genres.extend(genre.split(","))
genres = list(set(temp_genres))


def compute_title_similarity(row, model_row):
    movie_row = str(row["title"])
    movie_model_row = str(model_row["title"])
    return title_comparator.compare(movie_row, movie_model_row)


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


def assign_points(model_row, moviesData):
    moviesData["points"] = moviesData.apply(
        lambda row: compute_points(row, model_row), axis=1
    )


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


def convert_title_to_ref_tag(title, id):
    return (
        "<a href='"
        + HOST
        + "/movie/"
        + str(id)
        + '\' target="_blank">'
        + str(title)
        + "</a>"
    )


def get_recommendation_by_title(movieTitle, moviesData):

    # movieTitle, confidence = extract_movie_title(movieTitle)
    # # print("recommendation for: " + movieTitle, "points: ", confidence)

    # if confidence < 70:
    #     return "Sorry, I don't know what you mean. Try again."

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


name = input()
print(get_recommendation_by_title(name, moviesData))
