import data
import pandas as pd
from fuzzywuzzy import fuzz

df = data.moviesdf.copy(deep=True)


# print("Buildind relationship between movies...")


def extract_all_movies_name():
    movies_name = []
    df.apply(lambda row: movies_name.append(str(row["title"])), axis=1)
    return movies_name


movies_name = extract_all_movies_name()
# print(movies_name)
edges = {}

for i in range(len(movies_name)):
    for j in range(i + 1, len(movies_name)):
        point = fuzz.ratio(movies_name[i], movies_name[j])
        if point > 75:
            edges[(movies_name[i], movies_name[j])] = point

# print(edges)


def compare(title1, title2):
    global edges
    if (title1, title2) in edges:
        return edges[(title1, title2)]
    if (title2, title1) in edges:
        return edges[(title2, title1)]
    return 0


# stop = timeit.default_timer()
# print("Time taken to extract all movies name:", stop - start)
