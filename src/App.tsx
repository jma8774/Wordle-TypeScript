import React, { useState, useCallback, useEffect, useRef } from "react";
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

  const handleKeyPress = useCallback(
    (e: KeyboardEvent): void => {
      if (e.code === "Enter") submitGuess();
      else if (e.code === "Backspace") handleBackspace();
      else if (KEYS.has(e.key.toLowerCase())) handleChar(e.key.toLowerCase());
      else if (e.code === "Space") newGame();
    },
    [newGame, submitGuess, handleBackspace, handleChar]
  );

  useEffect(() => {
    // Add event listeners on new render
    window.addEventListener("keydown", handleKeyPress);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="min-h-screen bg-slate-800">
      <div className="w-1/2 flex flex-col items-center gap-2 text-white mx-auto">
        <div className="flex flex-col items-center gap-1 mt-2 w-full">
          <strong className="underline"> WIP (Learning Tailwind) 😂 </strong>
          <p className="text-gray-300 text-center">
            Finished setting up the functionalities of the application, just
            need better styling.
          </p>
        </div>

        <div className="flex flex-col items-center mt-2">
          <span> status: {status}</span>
          <span> guesses: {row} </span>
          <span> wordle: {wordle} </span>
          <span className="mt-1">
            <button
              className="bg-violet-800 hover:bg-violet-900 rounded-md py-1 px-3"
              onClick={newGame}
            >
              restart
            </button>
          </span>
        </div>

        <Guesses className="mt-2" guesses={history.data} row={row} />
        <Keyboard className="mt-2" alphabet={alphabet.alphabet} />
      </div>
    </div>
  );
};

export default App;
