// Package imports
import { useEffect } from "react";
import classNames from "classnames";
import { useNavigate, useSearchParams } from "react-router-dom";

// Custom imports
import { useAppDispatch, useAppSelector } from "./redux/hooks";
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
  Debug,
  GameResult,
} from "./components";
import { KEYS } from "./utils/constants";
import {
  openHelp,
  openStat,
  openChallenge,
} from "./redux/features/setting/settingSlice";
import {
  submitBackspace,
  submitChar,
  submitWord,
} from "./redux/thunkActions/gameActions";
import { handleHint, newGame } from "./redux/thunkActions/toolbarActions";
import Challenge from "./components/Challenge/Challenge";

const App = () => {
  // console.log("App render");
  const dispatch = useAppDispatch();
  const { status, wordle } = useAppSelector((state) => state.game);
  const { guesses, row, col } = useAppSelector((state) => state.guesses);
  const { keyboard } = useAppSelector((state) => state.keyboard);
  const { showHelp, showStat, showGameResult, showChallenge } = useAppSelector(
    (state) => state.setting
  );
  const { answers, words } = useFetchWords();
  const navigate = useNavigate();
  const searchParams = useSearchParams()[0];
  const modalOpen = showHelp || showStat || showGameResult || showChallenge;

  const handleNewGame = () => {
    dispatch(newGame(answers.current));
    // To avoid user from getting the same challenge again if they refresh after beating it
    if (searchParams.get("word")) navigate("/Wordle-TypeScript");
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent): void => {
      // Ignore default when these keys are pressed for our application
      const preventDefault = ["Enter", "Backspace", "Space"];
      if (!showChallenge && preventDefault.includes(e.code)) e.preventDefault();

      // Only key press available when game result is shown
      if (showGameResult && e.code === "Space") handleNewGame();

      // Key presses are disabled when these screens are present
      if (modalOpen || status !== "ongoing") return;

      if (e.code === "Enter") {
        dispatch(submitWord(words.current));
      } else if (e.code === "Backspace") {
        dispatch(submitBackspace());
      } else if (KEYS.has(e.key.toLowerCase())) {
        dispatch(submitChar(e.key.toLowerCase()));
      } else if (e.code === "Space") {
        handleNewGame();
      }
    };
    // Add event listeners on new render
    window.addEventListener("keydown", handleKeyPress);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }); // Empty dependency because this relies on pretty much all the states (so just re-create on every render)

  const bodyClass = classNames(
    "min-h-screen min-w-screen flex flex-col items-center gap-1 text-slate-200 mx-auto bg-slate-800",
    {
      "brightness-50": modalOpen,
      "brightness-100": !modalOpen,
    },
    "transition duration-500", // Transition properties
    { "scale-125": showGameResult }
  );
  return (
    <>
      <Confetti status={status} />
      <Stats />
      <Instruction />
      <Challenge answers={answers.current} />
      <GameResult handleNewGame={() => handleNewGame()} />
      <Notification />
      <div className={bodyClass}>
        <Header className="mt-3" />
        <div className="w-min">
          <Toolbar
            className="mt-12 xs:mt-16"
            handleRefresh={() => status === "ongoing" && handleNewGame()}
            handleHint={() => dispatch(handleHint())}
            handleHelp={() => status === "ongoing" && dispatch(openHelp())}
            handleStat={() => status === "ongoing" && dispatch(openStat())}
            handleChallenge={() =>
              status === "ongoing" && dispatch(openChallenge())
            }
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
        <Debug />
        <MadeWithLove />
      </div>
    </>
  );
};

export default App;
