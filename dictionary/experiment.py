from words_tree import root
from collections import deque
from itertools import combinations
from datetime import datetime


def letters_in_children(node_check, letters_check):
    letters_out = ''
    for ltr in letters_check:
        if ltr in node_check.children.keys():
            letters_out += ltr
    return letters_out


def find_word(letters_check):
    queue = deque([root])
    nodes_count = 0
    while queue:
        nodes_count += 1
        parent = queue.popleft()
        if parent.value == 1:
            return True, nodes_count
        for ltr in letters_in_children(parent, letters_check):
            queue.append(parent.children[ltr])
    return False, nodes_count


success, failure, max_count, average = [0] * 33, [0] * 33, [0] * 33, [0] * 33
alphabet = 'абвгдежзийклмнопрстуфхцчшщъыьэюя'
for k in range(2, len(alphabet) + 1):
    numbers = []
    for letters in combinations(alphabet, k):
        respond = find_word(letters)
        if respond[0]:
            success[k] += 1
        else:
            failure[k] += 1
        if respond[1] > max_count[k]:
            max_count[k] = respond[1]
        numbers.append(respond[1])
    average[k] = sum(numbers) / len(numbers)
    print(k, max_count[k], average[k], success[k], failure[k], datetime.now())
max_total = max(max_count)
print(max_count, max_total, average, success, failure, sep='\n')
