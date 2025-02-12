import React from 'react';
import { useState, useEffect } from "react";
import Board from "../Board/index.jsx";
import KeyBoard from "../KeyBoard/index.jsx";
import ModalFindWord from "../Modal/find_word.jsx";
import {CONSTANTS} from "../../additional/constants";

function Game(props) {
  const [letter, setLetter] = useState();
  const [changed, setChanged] = useState(false);
  const [letters, setLetters] = useState({});
  const [clicked, setClicked] = useState(0);
  const [modalOpened, setModalOpened] = useState(false);

  const onClickDown = (event) => {
    if (event.key === "Enter") {
      setLetter("ENTER");
      setClicked(clicked + 1);
    } else if (event.key === "Backspace") {
      setLetter("DEL");
      setClicked(clicked + 1);
    } else if ("абвгдежзийклмнопрстуфхцчшщыьъэюя".includes(event.key.toLowerCase())) {
      if (letters[event.key.toLowerCase()] !== "N") {
        setLetter(event.key.toUpperCase());
        setClicked(clicked + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onClickDown);

    return () => window.removeEventListener("keydown", onClickDown);
  });


  const keyHandler = (letterValue) => {
    if (letterValue === "?") {
      setModalOpened(true);
    } else {
      setLetter(letterValue);
      setClicked(clicked + 1);
    }
  };
  const LettersHandler = (lettersValue) => {
    setLetters(lettersValue);
    setChanged(!changed);
  };
  return (
    <>
      {modalOpened && <ModalFindWord
          letters={Object.keys(letters).filter(key => letters[key] !== "N")}
          close={() => setModalOpened(false)}/>}
      <div>
        <Board
          letter={letter}
          clicks={clicked}
          letters={LettersHandler}
        />
        <KeyBoard keyHandler={keyHandler} letters={letters} changed={changed} />
      </div>
    </>
  );
}

export default Game;
