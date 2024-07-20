import React from 'react';
import CloseIcon from "@mui/icons-material/Close";

function Modal(props) {
  return (
    <div className="absolute w-full h-full grid place-self-center">
      <div
        className={"z-10 flex place-self-center flex-col rounded-xl bg-white p-5 pb-10 " +
                   "drop-shadow-3xl dark:bg-zinc-800 dark:text-white border-solid border-2"}
        style={{ width: "min(600px, 90vw)", height: "min(450px, 60vh)" }}
      >
        <div className="flex justify-between items-center pb-5">
          <CloseIcon className="text-white dark:text-zinc-800" />
          <h2 className="font-black text-2xl">{props.title}</h2>
          <CloseIcon
            onClick={() => {
              props.close();
            }}
          />
        </div>
        <div className="modal overscroll-contain overflow-y-scroll sm:px-7">
          {props.children}
        </div>
      </div>
      <div
        className="z-0 absolute w-full h-full grid place-self-center"
        onClick={() => {
          props.close();
        }}
      />
    </div>
  );
}

export default Modal;