from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/')
def game_page():
    return render_template('index.html')


@app.route("/check_word", methods=['POST'])
def check_word():
    data = request.get_json()
    word = data['word']
    print(word)
    return {'valid': True}


if __name__ == '__main__':
    app.run()
