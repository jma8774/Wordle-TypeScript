// Package imports
import classNames from "classnames";

// Hooks
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import useFetchWords from "./hooks/useFetchWords";
import useNavigateOnChallenge from "./hooks/useNavigateOutChallenge";
import useKeyPress from "./hooks/useKeyPress";

// Components
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
  Challenge,
} from "./components";

// Redux Actions/Slices/Selectors
import {
  submitBackspace,
  submitChar,
  submitWord,
} from "./redux/thunkActions/gameActions";
import { newGame } from "./redux/thunkActions/toolbarActions";
import { selectModals } from "./redux/features/setting/settingSlice";

// Misc
import { KEYS } from "./utils/constants";

const App = () => {
  const dispatch = useAppDispatch();
  const { showHelp, showStat, showGameResult, showChallenge } =
    useAppSelector(selectModals);
  const modalOpen = showHelp || showStat || showGameResult || showChallenge;

  const { answers, words } = useFetchWords();
  const { navigateToRoot } = useNavigateOnChallenge();

  useKeyPress({
    Backspace: () => dispatch(submitBackspace()),
    Enter: () => dispatch(submitWord(words.current)),
    Space: () => {
      dispatch(newGame(answers.current));
      navigateToRoot();
    },
    // KeyA...KeyZ: (key) => dispatch(submitChar(key)),
    ...Array.from(KEYS)
      .map((code) => ({ [`Key${code}`]: () => dispatch(submitChar(code)) }))
      .reduce((acc, op) => ({ ...acc, ...op }), {}),
  });

  const bodyClass = classNames(
    "min-h-screen min-w-screen flex flex-col items-center gap-1 text-slate-200 mx-auto bg-slate-800 pt-3",
    modalOpen ? "brightness-50" : "brightness-100",
    "transition duration-500", // Transition properties
    showGameResult && "scale-125"
  );

  return (
    <>
      {/* Modals/Absolute Components */}
      <Confetti />
      <Stats />
      <Instruction />
      <Challenge answers={answers.current} />
      <GameResult answers={answers.current} />
      <Notification />

      {/* App Body */}
      <div className={bodyClass}>
        <Header />
        <div className="w-min">
          <Toolbar className="mt-12 xs:mt-16" answers={answers.current} />
          <Guesses />
        </div>
        <Keyboard className="mt-12" words={words.current} />
        <Debug />
        <MadeWithLove />
      </div>
    </>
  );
};

export default App;
