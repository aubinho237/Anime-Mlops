from flask import Flask
from flask_cors import CORS
app = Flask(__name__)

CORS(app)

@app.route("/")
def hello_world():
    return "Hello, Anime team is working, prolly end it soon"

@app.route("/api", methods=['GET'])
def index():
    return {"message": "welcome to our application"}

if __name__ == "__main__":
    app.run()
