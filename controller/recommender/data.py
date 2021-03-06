from pymongo import MongoClient
import pandas as pd
import warnings

warnings.filterwarnings("ignore")


def connect_mongo(host, username, password, db):
    """A util for making a connection to mongo"""

    if username and password:
        mongo_uri = "mongodb+srv://%s:%s@%s/%s" % (username, password, host, db)
        conn = MongoClient(mongo_uri)
    else:
        conn = MongoClient(host)
    return conn[db]


def import_mongo_data(
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
    return cursor


# print("Fetching data...")

moviesdc = import_mongo_data(
    "cs422",
    "movies",
    host="time2movie.kuhyb.mongodb.net/cs422?retryWrites=true&w=majority",
    username="cs422",
    password="time2movie",
)

moviesdf = pd.DataFrame(list(moviesdc))

reviewsdc = import_mongo_data(
    "cs422",
    "reviews",
    host="time2movie.kuhyb.mongodb.net/cs422?retryWrites=true&w=majority",
    username="cs422",
    password="time2movie",
)

reviewsdf = pd.DataFrame(list(reviewsdc))

commentsdc = import_mongo_data(
    "cs422",
    "comments",
    host="time2movie.kuhyb.mongodb.net/cs422?retryWrites=true&w=majority",
    username="cs422",
    password="time2movie",
)

commentsdf = pd.DataFrame(list(commentsdc))
# print("YUUYUUUYUYUYUYUYUUYU")
# for x in reviewsdc:
#     print(x)

# print("Data fetched!")
