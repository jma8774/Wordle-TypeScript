import React, { useState, useEffect, useRef } from "react";
import useFetchWords from "./hooks/useFetchWords";
import {
  Header,
  Toolbar,
  Guesses,
  Keyboard,
  Instruction,
  Stats,
  Confetti,
  Notification,
  Divider,
  MadeWithLove,
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

const App = () => {
  // console.log("App render");
  const dispatch = useAppDispatch();
  const { status, wordle } = useAppSelector((state) => state.game);
  const { guesses, row, col } = useAppSelector((state) => state.guesses);
  const { keyboard } = useAppSelector((state) => state.keyboard);
  const { showHelp, showStat } = useAppSelector((state) => state.setting);
  const { answers, words } = useFetchWords();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent): void => {
      if (showHelp || showStat) return;

      let preventDefault = true;
      if (e.code === "Enter") {
        submitWord(dispatch, row, guesses, words.current, wordle);
      } else if (e.code === "Backspace") {
        submitBackspace(dispatch, status);
      } else if (KEYS.has(e.key.toLowerCase())) {
        submitChar(dispatch, status, e.key.toLowerCase());
      } else if (e.code === "Space") {
        newGame(dispatch, answers.current, status);
      } else preventDefault = false;

      if (preventDefault) e.preventDefault();
    };
    // Add event listeners on new render
    window.addEventListener("keydown", handleKeyPress);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }); // Empty dependency because this relies on pretty much all the states

  const bodyClass = classNames(
    "min-h-screen min-w-screen flex flex-col items-center gap-1 text-slate-200 mx-auto bg-slate-800",
    {
      "brightness-50": showHelp || showStat,
      "brightness-100": !(showHelp || showStat),
    }
  );
  return (
    <>
      <Confetti status={status} />
      <Stats />
      <Instruction />
      <Notification />
      <div className={bodyClass}>
        <Header className="mt-3" />
        <div className="w-min">
          <Toolbar
            className="mt-10"
            handleRefresh={() => newGame(dispatch, answers.current, status)}
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
          <span className="font-bold text-red-500">DEBUG</span>
          <span> status: {status}</span>
          <span> row: {row} </span>
          <span> col: {col} </span>
          <span> wordle: {wordle} </span>
        </div>
        <MadeWithLove />
      </div>
    </>
  );
};

export default App;
