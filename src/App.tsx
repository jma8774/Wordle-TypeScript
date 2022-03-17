import React, { useState, useEffect, useRef } from "react";
import useGame from "./hooks/useGame";
import Guesses from "./components/Guesses";
import Keyboard from "./components/Keyboard";

// set of letters from 'a' to 'z'
const KEYS = new Set();
for (let i = 0; i < 26; i++) {
  KEYS.add(String.fromCharCode("a".charCodeAt(0) + i));
}

const App = () => {
  const {
    row,
    wordle,
    history,
    alphabet,
    status,
    newGame,
    submitGuess,
    handleBackspace,
    handleChar,
  } = useGame();

  const handleKeyPress = (e: KeyboardEvent): void => {
    if (e.code === "Enter") submitGuess();
    else if (e.code === "Backspace") handleBackspace();
    else if (KEYS.has(e.key.toLowerCase())) handleChar(e.key.toLowerCase());
    else if (e.code === "Space") newGame();
  };

  useEffect(() => {
    // Add event listeners on new render
    window.addEventListener("keydown", handleKeyPress);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div>
      <div>
        <strong> WIP 😂 </strong>
      </div>
      {`status: ${status}`}
      <br />
      {`guesses: ${row}`}
      <br />
      {`wordle: ${wordle}`}
      <br />
      <button onClick={newGame}> restart </button>
      <br />
      <br />
      <Guesses guesses={history.data} row={row} />
      <br />
      <Keyboard alphabet={alphabet.alphabet} />
    </div>
  );
};

export default App;
