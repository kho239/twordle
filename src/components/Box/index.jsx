import React from 'react';
import { useEffect, useState } from "react";
import BackspaceIcon from "@mui/icons-material/Backspace";

function Box(props) {
  const regularInputBoxStyle = "text-black border-2 border-gray-300 dark:bg-zinc-800 dark:text-white rounded";
  const activeInputBoxStyle = "text-black border-2 border-gray-400 dark:bg-zinc-800 dark:text-white rounded";

  const [state, setState] = useState(regularInputBoxStyle);

  useEffect(() => {
    if (props.state === "C")
      setState("bg-correct text-white");
    if (props.state === "E")
      setState("bg-exist text-white");
    if (props.state === "N")
      setState("bg-gray-500 text-white dark:bg-gray-600");
    if (props.state === "REGULAR")
      setState(regularInputBoxStyle);
    if (props.state === "ACTIVE")
      setState(activeInputBoxStyle);
  }, [props.state]);

  return (
    <div
      className={
        "h-12 w-12 sm:w-14 sm:h-14 grid place-items-center p-0 m-0 font-bold text-2xl rounded-sm " + state
      }
    >
      {props.value === "DEL" ? <BackspaceIcon /> : props.value}
    </div>
  );
}

export default Box;
