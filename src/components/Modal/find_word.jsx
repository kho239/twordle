import React, {useState} from 'react';
import Modal from "./base.jsx";
import {CONSTANTS} from "../../additional/constants";

function ModalFindWord(props) {
  const [foundWord, setFoundWord] = useState("");

  const findWord = () => {
    fetch(`${CONSTANTS.BACKEND_URL}/find_word`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  letters: props.letters
                })})
        .then(response => response.json())
        .then(data => {
          if (data['word'] !== null) {
            setFoundWord("Найдено слово: " + data['word']);
          } else {
            setFoundWord('Слово не найдено');
          }
        });
  }
  const close = () => {
      setFoundWord("");
      props.close();
  }
  return (
    <Modal title="Наличие слова" close={close}>
          {" "}
          <p className={"text-sm sm:text-base py-5 font-regular opacity-75 mr-1"}>
            Застряли и не можете придумать слово? Проверьте его наличие в словаре! Ваши буквы:
          </p>
          <p className={"text-sm sm:text-base py-5 font-regular opacity-75 mr-1"}>
              {props.letters.join(", ")}
          </p>
          <br/>
          <button onClick={findWord}
                  className={"bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white " +
                             "py-2 px-4 border border-blue-500 hover:border-transparent rounded"}>
            Проверить
          </button>
          <p className={"text-sm sm:text-base py-5 font-regular opacity-75 mr-1"}>
              {foundWord}
          </p>
          {" "}
        </Modal>
  );
}

export default ModalFindWord;