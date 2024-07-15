import pickle
from flask import Flask, render_template, request
from flask_cors import CORS


class Node:
    def __init__(self, value=0):
        self.children = {}
        self.value = value


app = Flask(__name__)
CORS(app)
with open('dictionary/dictionary.pickle', 'rb') as dictionary:
    root = pickle.load(dictionary)


@app.route('/')
def game_page():
    return render_template('index.html')


def check_word_tree(word):
    node = root
    for letter in word.lower():
        if letter not in node.children.keys():
            return False
        else:
            node = node.children[letter]
    return node.value == 1


@app.route("/check_word", methods=['POST'])
def check_word():
    data = request.get_json()
    return {'valid': check_word_tree(data['word'])}


if __name__ == '__main__':
    app.run()
