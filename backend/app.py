from flask import Flask
from flask_cors import CORS
from flask import request, jsonify
import pandas as pd 
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
    print(data)
    return jsonify({'result': 'success'})



# read dataset from CSV file
anime_df = pd.read_csv("/home/aubain/M2PRO/anime_project/Anime-Mlops/data/Anime_data.csv")

@app.route("/api/anime", methods=["GET"])
def get_anime():
    return jsonify(anime_df.to_dict(orient="records"))

@api.route("/flask-prometheus-grafana-example/")
def hello():
    return jsonify(say_hello())


def say_hello():
    return {"message": "hello"}

if __name__ == "__main__":
    app.run()
