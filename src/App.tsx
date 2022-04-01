import React, { useState, useCallback, useEffect, useRef } from "react";
import useGame from "./hooks/useGame";
import { Header, Toolbar, Guesses, Keyboard, Instruction } from "./components";

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
    getHint,
  } = useGame();
  const [showInstruction, setShowInstruction] = useState(false);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent): void => {
      let preventDefault = true;
      if (e.code === "Enter") submitGuess();
      else if (e.code === "Backspace") handleBackspace();
      else if (KEYS.has(e.key.toLowerCase())) handleChar(e.key.toLowerCase());
      else if (e.code === "Space") newGame();
      else preventDefault = false;

      if (preventDefault) e.preventDefault();
    },
    [newGame, submitGuess, handleBackspace, handleChar]
  );

  const closeInstruction = useCallback(
    () => setShowInstruction(false),
    [showInstruction]
  );

  const openInstruction = useCallback(
    () => setShowInstruction(true),
    [showInstruction]
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
    <div>
      {showInstruction && <Instruction closeInstruction={closeInstruction} />}
      <div
        className={
          "min-h-screen min-w-screen bg-slate-800" +
          (showInstruction ? " brightness-50 " : " brightness-100 ")
        }
      >
        <div className="flex flex-col items-center gap-1 text-slate-200 mx-auto">
          <Header className="mt-3" />
          <div className="w-min">
            <Toolbar
              className="mt-10"
              handleRefresh={newGame}
              handleHint={getHint}
              openInstruction={openInstruction}
            />
            <Guesses guesses={history.data} />
          </div>
          <Keyboard
            className="mt-12"
            alphabet={alphabet.alphabet}
            handleChar={handleChar}
            handleBackspace={handleBackspace}
            submitGuess={submitGuess}
          />
          <div className="flex flex-col items-center mt-10 bg-slate-900 rounded p-5">
            <span className="font-bold text-red-500">DEBUG DATA</span>
            <span> status: {status}</span>
            <span> guesses: {row} </span>
            <span> wordle: {wordle} </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
