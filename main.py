import pickle
from flask import Flask, render_template, request
from flask_cors import CORS
from collections import deque

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


def letters_in_children(node_check, letters_check):
    letters_out = ''
    for ltr in letters_check:
        if ltr in node_check.children.keys():
            letters_out += ltr
    return letters_out


def find_word_tree(letters):
    queue = deque([root])
    word_out = {root: ''}
    while queue:
        parent = queue.popleft()
        if parent.value == 1:
            return word_out[parent]
        for ltr in letters_in_children(parent, letters):
            queue.append(parent.children[ltr])
            word_out[parent.children[ltr]] = word_out[parent] + ltr
    return None


@app.route("/check_word", methods=['POST'])
def check_word():
    data = request.get_json()
    return {'valid': check_word_tree(data['word'])}


@app.route("/find_word", methods=['POST'])
def find_word():
    data = request.get_json()
    return {'word': find_word_tree(data['letters'])}


if __name__ == '__main__':
    app.run()
