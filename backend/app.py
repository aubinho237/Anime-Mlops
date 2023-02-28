from flask import Flask
from flask_cors import CORS
from flask import request, jsonify
import pandas as pd 


app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "Hello, Anime team is working, prolly end it soon"

@app.route("/api", methods=['GET'])
def index():
    return {"message": "welcome to our application"}

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()
    # process the form data here
    # ...
    return jsonify({'result': 'success'})

# read dataset from CSV file
anime_df = pd.read_csv("/home/aubain/M2PRO/anime_project/Anime-Mlops/data/Anime_data.csv")

@app.route("/api/anime", methods=["GET"])
def get_anime():
    return jsonify(anime_df.to_dict(orient="records"))

if __name__ == "__main__":
    app.run()
