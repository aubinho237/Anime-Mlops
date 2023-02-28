# Import des librairies
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from PIL import Image
import imagehash
import requests
from io import BytesIO
from pyspark.ml.feature import StringIndexer
from sklearn.preprocessing import LabelEncoder
from gensim.models import Word2Vec
import nltk
from nltk.tokenize import word_tokenize
import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
from sys import displayhook
import warnings
import os

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

# Importer les bibliothèques nécessaires
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

# Séparer les données en entrées (X)
X = data.drop(columns=["Rating"])
# Séparer les données en cibles (y)
y = data["Rating"]
# Séparation :
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
# Créer le modèle
gb_reg = GradientBoostingRegressor()
# Entraîner le modèle
gb_reg.fit(X_train, y_train)
# Faire des prédictions sur les données de test
y_pred = gb_reg.predict(X_test)
# Évaluer les performances du modèle
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("Mean squared error: ", mse)
print("R-squared: ", r2)
