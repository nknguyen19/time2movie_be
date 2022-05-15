import conversational_bot
import recommendation_bot

CONVERSATION = 1
SUGGEST_RANDOM_MOVIES = 2
RECOMMEND_SIMILAR_MOVIES = 3
RECOMMEND_MOVIES_BASED_ON_GENRE = 4


def classify(input):
    title, confidence = recommendation_bot.extract_movie_title(input)
    if confidence >= 87:
        return RECOMMEND_SIMILAR_MOVIES
    genre, confidence = recommendation_bot.extract_movie_genre(input)
    if confidence >= 70:
        return RECOMMEND_MOVIES_BASED_ON_GENRE
    words = [
        "movie",
        "suggest",
        "recommend",
        "recommendation",
        "watch",
        "watch movie",
        "film",
    ]
    for word in words:
        if word in input:
            return SUGGEST_RANDOM_MOVIES
    return CONVERSATION


def get_response(input_type, bot_input):
    if input_type == CONVERSATION:
        return conversational_bot.bot.get_response(bot_input)
    elif input_type == RECOMMEND_SIMILAR_MOVIES:
        return recommendation_bot.get_recommendation_by_title(
            bot_input, recommendation_bot.moviesData
        )
    elif input_type == RECOMMEND_MOVIES_BASED_ON_GENRE:
        return recommendation_bot.get_recommendation_by_genre(
            bot_input, recommendation_bot.moviesData
        )
    elif input_type == SUGGEST_RANDOM_MOVIES:
        return recommendation_bot.get_random_recommendation(
            bot_input, recommendation_bot.moviesData
        )
    else:
        return "Sorry, I don't understand"


while True:
    user_id, bot_input = input().split(' ', 1)
    input_type = classify(bot_input)
    output = get_response(input_type, bot_input)
    print('''{}: {}'''.format(user_id, output))
