
from flask import Flask
from flask_cors import CORS
from flask import request, jsonify
import pandas as pd 


# Import des librairies
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from PIL import Image
import imagehash
import requests
from io import BytesIO
from sklearn.preprocessing import LabelEncoder
from gensim.models import Word2Vec
from nltk.tokenize import word_tokenize
import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
from sys import displayhook
import warnings
import os
import nltk
nltk.download('stopwords')
nltk.download('punk')
# load the model

path = os.getcwd()

warnings.filterwarnings("ignore")
# Load training data from main file
data = pd.read_csv(path + "/data/Anime_data.csv")

# preprocessing
data.loc[data["Rating"].isnull(), "Rating"] = 0.0
data.dropna(subset=["Type"], inplace=True)
data.dropna(subset=["Popularity"], inplace=True)
data["Genre"].fillna("Unknown", inplace=True)
data["Synopsis"].fillna("Unknown", inplace=True)
data["Producer"].fillna("Unknown", inplace=True)
data["Studio"].fillna("Unknown", inplace=True)
data["Episodes"].fillna("Unknown", inplace=True)
data["Source"].fillna("Unknown", inplace=True)
data["Aired"].fillna("Unknown", inplace=True)
data["Link"].fillna("Unknown", inplace=True)
data.loc[data["ScoredBy"].isnull(), "ScoredBy"] = 0.0
data.loc[data["Popularity"].isnull(), "Popularity"] = 0.0

# computing rating rate
# m = data.Members.quantile(0.75)
# C = data.Rating.mean()


# def weighted_rating(df, m, C):
#     term = df["Members"] / (m + df["Members"])
#     return df["Rating"] * term + (1 - term) * C


# data["community_rating"] = data.apply(weighted_rating, axis=1, args=(m, C))

# Another transformation
data.drop(
    [
        "Anime_id",
        "Type",
        "ScoredBy",
        "Popularity",
        "Members",
        "Episodes",
        "Source",
        "Aired",
        "Link",
    ],
    axis=1,
    inplace=True,
)

import string
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import CountVectorizer


def text_process(mess):
    nopunc = [char for char in mess if char not in string.punctuation]
    nopunc = "".join(nopunc)
    return [
        word
        for word in nopunc.split()
        if word.lower() not in stopwords.words("english")
    ]


# It's take one text message and get its bag-of-words counts as a vector, putting to use our new bow_transformer:
bow_transformer_synopsis = CountVectorizer(analyzer=text_process).fit_transform(
    data["Synopsis"].apply(lambda x: np.str_(x))
)
bow_transformer_title = CountVectorizer(analyzer=text_process).fit_transform(
    data["Title"].apply(lambda x: np.str_(x))
)
bow_transformer_genre = CountVectorizer(analyzer=text_process).fit_transform(
    data["Genre"].apply(lambda x: np.str_(x))
)
bow_transformer_producer = CountVectorizer(analyzer=text_process).fit_transform(
    data["Producer"].apply(lambda x: np.str_(x))
)
bow_transformer_studio = CountVectorizer(analyzer=text_process).fit_transform(
    data["Studio"].apply(lambda x: np.str_(x))
)

data["Synopsis"] = bow_transformer_synopsis.getnnz(axis=1)
data["Title"] = bow_transformer_title.getnnz(axis=1)
data["Genre"] = bow_transformer_genre.getnnz(axis=1)
data["Producer"] = bow_transformer_producer.getnnz(axis=1)
data["Studio"] = bow_transformer_studio.getnnz(axis=1)

# Build the model Gradien boosting

# Importer les biblioth??ques n??cessaires
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

# S??parer les donn??es en entr??es (X)
X = data.drop(columns=["Rating"])
# S??parer les donn??es en cibles (y)
y = data["Rating"]
# S??paration :
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
# Cr??er le mod??le
gb_reg = GradientBoostingRegressor()
# Entra??ner le mod??le
gb_reg.fit(X_train, y_train)
# Faire des pr??dictions sur les donn??es de test
y_pred = gb_reg.predict(X_test)
# ??valuer les performances du mod??le
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)











# from prometheus_client import REQUESTS, EXCEPTIONS, LATENCY, start_monitoring


app = Flask(__name__)
CORS(app)

# Prometheus option

# @app.before_request
# def before_request():
#     request.start_time = time.time()

# @app.after_request
# def after_request(response):
#     latency = time.time() - request.start_time
#     LATENCY.observe(latency)
#     REQUESTS.inc()
#     return response

# @app.errorhandler(Exception)
# def handle_exception(e):
#     EXCEPTIONS.inc()
#     return jsonify({'error': str(e)}), 500

#Route

@app.route("/", methods=['GET'])
def index():
    return {"message": "welcome to our application"}

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()
    # process the form data here
    # ...
    print("hello")
<<<<<<< HEAD
    #return jsonify({'result': 'success'})
    return jsonify(r2)

=======
    print(data)
    return jsonify({'result': 'success'})
>>>>>>> a3f41cfa4c324b11ada26abd7a79441c6d28f20e



# read dataset from CSV file
anime_df = pd.read_csv("/home/aubain/M2PRO/anime_project/Anime-Mlops/data/Anime_data.csv")

@app.route("/api/anime", methods=["GET"])
def get_anime():
    return jsonify(anime_df.to_dict(orient="records"))


if __name__ == "__main__":
    app.run()
