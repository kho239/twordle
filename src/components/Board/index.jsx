import React from 'react';
import { useEffect, useState } from "react";
import Box from "../Box/index.jsx";
import BACKEND_URL from "../../additional/constants.js"


let defaultBoard = [];
let defaultLetters = [];

"abcdefghijklmnopqrstuvwxyz".split("").forEach((i) => {
  defaultLetters[i] = "";
});

for (let i = 0; i < 6; i++) {
  defaultBoard.push([]);
  for (let j = 0; j < 5; j++) {
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
          setCol(col === 0 ? 0 : col - 1);
          setBoard((prevBoard) => {
            prevBoard[row][col === 0 ? 0 : col - 1][0] = "";
            return prevBoard;
          });
        } else {
          setBoard((prevBoard) => {
            if (props.letter === "ENTER") {
              let word = "";
              for (let i = 0; i < prevBoard[row].length; i++) {
                word += prevBoard[row][i][0];
              }
              fetch('http://127.0.0.1:5000/check_word', {
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
                    setRow(row + 1);
                    setCol(0);
                    prevBoard.push([]);
                    for (let j = 0; j < 5; j++) {
                      prevBoard[row].push(["", ""]);
                    }
                    setBoard(prevBoard)
                  }
                })
              // let result = fetch(`${BACKEND_URL}/check_word`, {
              //   method: 'GET',
              //   headers: {
              //     'Content-Type': 'application/json',
              //   },
              //   body: JSON.stringify({
              //     word: word
              //   })
              // });
              // if (result.json()['valid'] === true) {
              //   setRow(row + 1);
              //   setCol(0);
              //   prevBoard.push([]);
              //   for (let j = 0; j < 5; j++) {
              //     prevBoard[row].push(["", ""]);
              //   }
              // }
            }
            if (col < 5) {
              prevBoard[row][col][0] = props.letter;
              setCol(col + 1);
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
    <div className="px-10 py-5 grid gap-y-1 items-center w-100 justify-center">
      {board.map((row, key) => {
        return (
          <div key={key} className="flex gap-1 w-fit">
            {row.map((value, key) => (
              <Box key={key} value={value[0]} state={value[1]} pos={key} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
