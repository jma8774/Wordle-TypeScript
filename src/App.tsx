// Package imports
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import classNames from "classnames";

// Custom imports
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
  MadeWithLove,
} from "./components";
import { KEYS } from "./constants";
import { openHelp, openStat } from "./redux/features/setting/settingSlice";
import {
  submitBackspace,
  submitChar,
  submitWord,
} from "./redux/thunkActions/gameActions";
import { handleHint, newGame } from "./redux/thunkActions/toolbarActions";

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
        dispatch(submitWord(words.current));
      } else if (e.code === "Backspace") {
        dispatch(submitBackspace());
      } else if (KEYS.has(e.key.toLowerCase())) {
        dispatch(submitChar(e.key.toLowerCase()));
      } else if (e.code === "Space") {
        dispatch(newGame(answers.current));
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
            handleRefresh={() => dispatch(newGame(answers.current))}
            handleHint={() => dispatch(handleHint())}
            handleHelp={() => dispatch(openHelp())}
            handleStat={() => dispatch(openStat())}
          />
          <Guesses guesses={guesses} />
        </div>
        <Keyboard
          className="mt-12"
          alphabet={keyboard}
          handleChar={(ch) => dispatch(submitChar(ch))}
          handleBackspace={() => dispatch(submitBackspace())}
          submitGuess={() => dispatch(submitWord(words.current))}
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
