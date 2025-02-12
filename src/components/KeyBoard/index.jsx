import React from 'react';
import { useEffect, useState } from "react";
import BackspaceIcon from "@mui/icons-material/Backspace";

const keyboard = {
  line1: "ЙЦУКЕНГШЩЗХЪ",
  line2: "ФЫВАПРОЛДЖЭ",
  line3: "ЯЧСМИТЬБЮ",
};

let defaultLetters = [];

"абвгдежзийклмнопрстуфхцчшщыьъэюя".split("").forEach((i) => {
  defaultLetters[i] = "";
});

function Key(props) {
  const [state, setState] = useState("bg-gray-200 hover:bg-gray-300 dark:bg-zinc-400 dark:text-white dark:hover:bg-zinc-500");

  const x = props.value.length === 1 ? "w-7 sm:w-10 " : "p-2 sm:p-4 ";
  const returnKey = () => {
    props.getKey(props.value);
  };

  useEffect(() => {
    setTimeout(() => {
      if (props.state === "C") setState("bg-correct text-white");
      if (props.state === "E") setState("bg-exist text-white");
      if (props.state === "N") setState("bg-gray-500 text-white dark:bg-gray-600");
    }, 350);
  }, [props.state]);

  return (
    <button
      className={
        x +
        state +
        " h-14 300 grid items-center rounded font-semibold cursor-pointer"
      }
      onClick={props.state !== "N" ? returnKey: null}
    >
      {props.value === "DEL" ? <BackspaceIcon /> : props.value}
    </button>
  );
}

function KeyBoard(props) {
  const [letters, setLetters] = useState(defaultLetters);
  useEffect(() => {
    setLetters(props.letters);
  }, [props.changed]);

  const keyHandler = (value) => {
    props.keyHandler(value);
  };
  return (
    <div className="flex flex-col items-center w-100 pb-5">
      <div className="flex gap-1 my-0.5 w-fit">
        {keyboard.line1.split("").map((value, key) => (
          <Key
            getKey={keyHandler}
            value={value}
            key={key}
            state={letters[value.toLowerCase()]}
          />
        ))}
      </div>
      <div className="flex gap-1 my-0.5 w-fit">
        {keyboard.line2.split("").map((value, key) => (
          <Key
            getKey={keyHandler}
            value={value}
            key={key}
            state={letters[value.toLowerCase()]}
          />
        ))}
        <Key value="?" getKey={keyHandler} />
      </div>
      <div className="flex gap-1 my-0.5 w-fit">
        <Key value="ENTER" getKey={keyHandler} />
        {keyboard.line3.split("").map((value, key) => (
          <Key
            getKey={keyHandler}
            value={value}
            key={key}
            state={letters[value.toLowerCase()]}
          />
        ))}
        <Key value="DEL" getKey={keyHandler} />
      </div>
    </div>
  );
}

export default KeyBoard;
