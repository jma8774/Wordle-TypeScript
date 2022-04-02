import React, { useState, useEffect } from "react";
import useFetchWords from "./hooks/useFetchWords";
import {
  Header,
  Toolbar,
  Guesses,
  Keyboard,
  Instruction,
  Confetti,
} from "./components";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import {
  handleBackspace,
  handleChar,
} from "./redux/features/guesses/guessesSlice";
import {
  newGame,
  submitChar,
  submitBackspace,
  submitWord,
  handleHint,
} from "./redux/batches";
import { KEYS } from "./constants";
import classNames from "classnames";
import { resetModals } from "./redux/features/setting/settingSlice";

const App = () => {
  const dispatch = useAppDispatch();
  const { status, wordle } = useAppSelector((state) => state.game);
  const { guesses, row, col } = useAppSelector((state) => state.guesses);
  const { keyboard } = useAppSelector((state) => state.keyboard);
  const { showHelp, showStat } = useAppSelector((state) => state.setting);
  const { answers, words } = useFetchWords();

  console.log("App render");

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent): void => {
      let preventDefault = true;
      if (e.code === "Enter") {
        submitWord(dispatch, row, guesses, words.current, wordle);
      } else if (e.code === "Backspace") {
        submitBackspace(dispatch, status);
      } else if (KEYS.has(e.key.toLowerCase())) {
        submitChar(dispatch, status, e.key.toLowerCase());
      } else if (e.code === "Space") {
        newGame(dispatch, answers.current);
      } else preventDefault = false;

      if (preventDefault) e.preventDefault();
    };

    // Add event listeners on new render
    window.addEventListener("keydown", handleKeyPress);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [dispatch, answers, guesses, row, status, wordle, words]);

  const bodyClass = classNames("min-h-screen min-w-screen bg-slate-800", {
    "brightness-50": showHelp || showStat,
    "brightness-100": !(showHelp || showStat),
  });
  return (
    <div className={bodyClass}>
      <Confetti status={status} />
      <div className="flex flex-col items-center gap-1 text-slate-200 mx-auto">
        <Header className="mt-3" />
        <div className="w-min">
          <Toolbar
            className="mt-10"
            handleRefresh={() => newGame(dispatch, answers.current)}
            handleHint={() => handleHint(dispatch, wordle)}
          />
          <Guesses guesses={guesses} />
        </div>
        <Keyboard
          className="mt-12"
          alphabet={keyboard}
          handleChar={(ch) => dispatch(handleChar(ch))}
          handleBackspace={() => dispatch(handleBackspace())}
          submitGuess={() =>
            submitWord(dispatch, row, guesses, words.current, wordle)
          }
        />
        <div className="flex flex-col items-center mt-10 bg-slate-900 rounded p-5">
          <span className="font-bold text-red-500">DEBUG DATA</span>
          <span> status: {status}</span>
          <span> row: {row} </span>
          <span> col: {col} </span>
          <span> wordle: {wordle} </span>
        </div>
      </div>
    </div>
  );
};

export default App;
