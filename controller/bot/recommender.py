import timeit

start = timeit.default_timer()
import data
import pandas as pd
import title_comparator
from bson.objectid import ObjectId


RECOMMENDATION_COUNT = 20
print(type(data.moviesdc))
for x in data.moviesdc:
    print(x)
moviesData = pd.DataFrame(list(data.moviesdc))
print("shfejkeshflskdngfekl")
for x in data.moviesdc:
    print(x)
# print("dafadfafdajkbkjbjjjjjjjjjjjjjjjjjjknkjnknjssd", len(data.moviesdc))
print("dafadfafdajkbkjbjjjjjjjjjjjjjjjjjssd", len(moviesData))
reviewsData = pd.DataFrame(list(data.reviewsdc))
commentsData = pd.DataFrame(list(data.commentsdc))

print("Data information")
print("moviesData")
print(moviesData.columns)
print("length =", len(moviesData))

print("commentsData")
print(reviewsData.columns)
print("length =", len(reviewsData))

print("reviewsData")
print(commentsData.columns)
print("length =", len(commentsData))
# print(moviesData.head(10))

moviesTitles = list(moviesData["title"])
# print(moviesTitles)
# genres = list(moviesData["gerne"].unique())
# temp_genres = []
# for genre in genres:
#     temp_genres.extend(genre.split(","))
# genres = list(set(temp_genres))
# print("All genres", genres)


# def get_current_userid():
#     return ObjectId("625bc6a99acc015c467d9313")


# def compute_weights(row, user_reviews, user_comments):
#     weight = 0
#     user_reviews_for_movie = user_reviews[user_reviews["movieid"] == row["_id"]]
#     user_comments_for_movie = user_comments[user_comments["movieid"] == row["_id"]]
#     if len(user_reviews_for_movie) > 0:
#         weight += user_reviews_for_movie["ratings"].mean() - 2
#     if len(user_comments_for_movie) > 0:
#         weight += 0
#     return weight


# def get_user_movies_with_weights(user_id):  # limit to 10 sorted by importance
#     global moviesData
#     global reviewsData
#     global commentsData
#     print("user_id", user_id)
#     print(type(user_id))
#     user_reviews = reviewsData[reviewsData["userid"] == user_id]
#     # print(len(user_reviews))
#     user_comments = commentsData[commentsData["userid"] == user_id]
#     user_movies = moviesData[
#         moviesData["_id"].isin(user_reviews["movieid"])
#         | moviesData["_id"].isin(user_comments["movieid"])
#     ]

#     # print("user movies", len(user_movies))
#     if len(user_movies) == 0:
#         moviesData["weights"] = 1
#         return moviesData.head()
#     user_movies["weights"] = user_movies.apply(
#         lambda row: compute_weights(row, user_reviews, user_comments), axis=1
#     )
#     return user_movies.sort_values(by="weights", ascending=False)


# def compute_title_similarity(row, model_row):
#     movie_row = str(row["title"])
#     movie_model_row = str(model_row["title"])
#     return title_comparator.compare(movie_row, movie_model_row)


# def compute_genre_similarity(row, model_row):
#     # TODO: FIX TYPO IN COLUMN NAME GERNE TO GENRE
#     current_genre = str(row["gerne"]).split(",")
#     model_genre = str(model_row["gerne"]).split(",")

#     similarity = 0
#     for genre in current_genre:
#         if genre in model_genre:
#             similarity += 1
#         else:
#             similarity -= 0.2

#     for genre in model_genre:
#         if genre not in current_genre:
#             similarity -= 0.1

#     return similarity


# weights = {
#     "genre": 50,
#     "IMDB_Rating": 0.1,
#     "votes": 0.000001,
#     "title": 100,
# }


# def compute_points(row, important_movies):
#     global weights
#     points = 0
#     # print("important_movies", important_movies)
#     points = important_movies.apply(
#         lambda model_row: (
#             (
#                 compute_genre_similarity(row, model_row)
#                 + compute_title_similarity(row, model_row)
#             )
#             * model_row["weights"]
#         ),
#         axis=1,
#     ).sum()
#     return points / len(important_movies)


# def get_personal_recommendations(user_id):
#     global moviesData
#     print("Getting personal recommendations...")
#     user_movies = get_user_movies_with_weights(user_id)
#     important_movies = user_movies.head(min(len(user_movies), 10))
#     print("Assigning points...")
#     moviesData["points"] = moviesData.apply(
#         lambda row: compute_points(row, important_movies),
#         axis=1,
#     )  # at most quadratic * title and genre similarity
#     print("Sorting...")
#     moviesData = moviesData.sort_values(by="points", ascending=False)
#     return moviesData.head(RECOMMENDATION_COUNT)


# stop = timeit.default_timer()
# timeRestart = stop - start


# def test():
#     print("Testing...")
#     start = timeit.default_timer()

#     print(get_personal_recommendations(get_current_userid()))

#     stop = timeit.default_timer()

#     print("Time for every input: ", stop - start)  # in seconds


# test()
# print("Time for every restart: ", timeRestart)
