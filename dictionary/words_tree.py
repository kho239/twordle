import pickle


class Node:
    def __init__(self, value=0):
        self.children = {}
        self.value = value


root = Node()
limit = 5
with open('words.txt', 'r', encoding='utf-8') as file:
    for word in file.readlines():
        word = word.strip()
        if len(word) > limit or '-' in word:
            continue
        else:
            node = root
            for letter in word:
                if letter in node.children.keys():
                    node = node.children[letter]
                else:
                    node.children[letter] = Node()
                    node = node.children[letter]
            node.value = 1


with open('dictionary.pickle', 'wb+') as dictionary:
    pickle.dump(root, dictionary)
