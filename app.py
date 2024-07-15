from flask import Flask, render_template, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/')
def game_page():
    return render_template('index.html')


@app.route("/check_word", methods=['POST'])
def check_word():
    data = request.get_json()
    return {'valid': data['word'] in ["ХУЙ", "ПИЗДА", "СЕВЦО"]}


if __name__ == '__main__':
    app.run()
