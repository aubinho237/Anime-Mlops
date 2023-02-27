from flask import Flask

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "Hello, Anime team is working, prolly end it soon"


if __name__ == "__main__":
    app.run()
