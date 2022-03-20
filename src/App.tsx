import React, { useState, useCallback, useEffect, useRef } from "react";
import useGame from "./hooks/useGame";
import { Header, Toolbar, Guesses, Keyboard } from "./components";

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
      <div className="flex flex-col items-center gap-1 w-min text-white mx-auto">
        <Header className="mt-3" />
        <Toolbar className="mt-4" handleRefresh={newGame} />
        <Guesses guesses={history.data} />
        <Keyboard className="mt-3" alphabet={alphabet.alphabet} />
        <div className="flex flex-col items-center mt-10 bg-slate-900 rounded p-5">
          <span className="font-bold text-red-500">DEBUG DATA</span>
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
      </div>
    </div>
  );
};

export default App;
