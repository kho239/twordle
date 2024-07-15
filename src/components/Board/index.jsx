import React from 'react';
import { useEffect, useState } from "react";
import Box from "../Box/index.jsx";
import { CONSTANTS } from "../../additional/constants.js"


let defaultBoard = [[["", ""]]];
let defaultLetters = [];

"абвгдежзийклмнопрстуфхцчшщыьъэюя".split("").forEach((i) => {
  defaultLetters[i] = "";
});

console.log(CONSTANTS.MAX_LETTERS_IN_WORD)
for (let i = 1; i < 6; i++) {
  defaultBoard.push([]);
  for (let j = 0; j < CONSTANTS.MAX_LETTERS_IN_WORD; j++) {
    defaultBoard[i].push(["", ""]);
  }
}

function Board(props) {
  const [letters, setLetters] = useState(defaultLetters);
  const [board, setBoard] = useState(defaultBoard);
  const [changed, setChanged] = useState(false);
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);

  useEffect(() => {
    {
      if (props.clicks !== 0) {
        if (props.letter === "DEL") {
          if (col === 0) {
            setBoard((prevBoard) => {
              prevBoard[row][0][0] = "";
              return prevBoard;
            });
          } else {
            setBoard((prevBoard) => {
              prevBoard[row][col - 1][0] = "";
              if (col < CONSTANTS.MAX_LETTERS_IN_WORD) {
                prevBoard[row].pop();
              }
              return prevBoard;
            });
            setCol(col - 1);
          }
        } else {
          setBoard((prevBoard) => {
            if (props.letter === "ENTER") {
              let word = "";
              for (let i = 0; i < prevBoard[row].length; i++) {
                word += prevBoard[row][i][0];
              }
              if (word === "") {
                return prevBoard
              }
              fetch(`${CONSTANTS.BACKEND_URL}/check_word`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  word: word
                })
              }).then(response => response.json())
                .then(data => {
                  if (data['valid'] === true) {
                    if (col < CONSTANTS.MAX_LETTERS_IN_WORD) {
                      prevBoard[row].pop();
                    }
                    prevBoard[row + 1] = [["", ""]]
                    setRow(row + 1);
                    setCol(0);
                    setBoard(prevBoard)
                  }
                })
            } else {
              if (col < CONSTANTS.MAX_LETTERS_IN_WORD) {
                prevBoard[row][col][0] = props.letter;
                if (col < CONSTANTS.MAX_LETTERS_IN_WORD - 1) {
                  prevBoard[row].push(["", ""])
                }
                setCol(col + 1);
              }
            }
            return prevBoard;
            }
          );
          }
      }
    }
  }, [props.clicks]);

  useEffect(() => {
    props.letters(letters);
  }, [changed]);

  return (
    <div className="px-10 py-5 grid gap-y-1 place-items-center w-full">
      {board.map((drawing_row, row_number) => {
        return (
          <div key={row_number} className="flex gap-1 w-fit">
            {drawing_row.map((drawing_col, col_number) => (
                (row_number === row && col_number === col) ?
                    <Box key={col_number} value={drawing_col[0]} state={"ACTIVE"} pos={col_number} /> :
                    <Box key={col_number} value={drawing_col[0]} state={"REGULAR"} pos={col_number} className="" />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
