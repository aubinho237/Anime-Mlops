from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "Hello, Anime team is working, prolly end it soon"

@app.route('/api/get_user_text', methods=['POST'])
def getUserText():
    title = request.form.get('title')
    genre = request.form.get('genre')
    description = request.form.get('description')
    type = request.form.get('type')
    producer = request.form.get('producer')
    studio = request.form.get('studio')

    response_data = {'title': title, 'genre': genre, 
                     'description': description, 
                     'type': type, 'producer': producer, 
                     'studio': studio}
    response = jsonify(response_data)
    response.status_code = 200
    return response

if __name__ == "__main__":
    app.run()
