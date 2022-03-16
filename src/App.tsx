import React, { useState, useEffect, useRef } from "react";
import useGame from "./hooks/useGame";
import Guesses from "./components/Guesses";
import Keyboard from "./components/Keyboard";

const KEYS = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'])

const App = () => {
  console.log("log: render app");
  const { row, wordle, history, alphabet, status, newGame, submitGuess, handleBackspace, handleChar } =
    useGame();

  const handleKeyPress = (e: KeyboardEvent): void => {
    if(e.code === 'Enter')
      submitGuess()
    else if(e.code === 'Backspace')
      handleBackspace()
    else if(KEYS.has(e.key.toLowerCase()))
      handleChar(e.key.toLowerCase())
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress])

  return (  
    <div>
      <div><strong> WIP 😂 </strong></div>
      {`status: ${status}`}
      <br />
      {`guesses: ${row}`}
      <br />
      {`wordle: ${wordle}`}
      <br />
      <br />
      <Guesses guesses={history.data} />
      <br />
      <Keyboard alphabet={alphabet.alphabet} />
    </div>
  );
};

export default App;
