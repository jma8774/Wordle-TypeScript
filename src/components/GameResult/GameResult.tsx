import classNames from "classnames";
import React, { useEffect } from "react";
import { openGameResult } from "../../redux/features/setting/settingSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { newGame } from "../../redux/thunkActions/toolbarActions";
import { randomInt } from "../../utils/helper";
import Divider from "../Divider/Divider";
import { RefreshIcon } from "../icons";
import Definition from "./Definition";
import { NewGameButton } from "./NewGameButton";
import { ShareWordButton } from "./ShareWordButton";

const winText = [
  "Nice cheats! 😂",
  "Got it on the first try, luck or skill?",
  "Wow, you're getting really good at this!",
  "Wow that was fast!",
  "Good job you guessed correctly!",
  "Phew, that was a close one!",
];
const tips = [
  "It may help to start with adieu or about.",
  "It may help to target vowels first.",
  "It may help to use characters that have not been used before.",
];

interface Props {
  answers: string[];
}

const GameResult = ({ answers }: Props) => {
  const dispatch = useAppDispatch();
  const { wordle, status } = useAppSelector((state) => state.game);
  const { row } = useAppSelector((state) => state.guesses);
  const { showGameResult } = useAppSelector((state) => state.setting);
  const containerClass = classNames(
    "absolute bg-transparent w-screen h-screen z-10"
  );
  const bodyClass = classNames(
    "flex flex-col gap-2 border-2 border-slate-700 bg-slate-800 max-w-sm sm:max-w-lg mx-auto my-28 p-5 rounded text-slate-200 animate-gameScreen"
  );

  useEffect(() => {
    let timeId: NodeJS.Timeout;
    if (status !== "ongoing") {
      timeId = setTimeout(() => {
        dispatch(openGameResult());
      }, 1200);
    }

    return () => clearTimeout(timeId);
  }, [status, dispatch]);

  if (!showGameResult) return null;

  return (
    <div className={containerClass}>
      <div className={bodyClass}>
        <div className="flex items-center">
          <span className="grow font-bold text-3xl">
            {status.toUpperCase()}
          </span>
          {/* <RefreshIcon
            altText="New Game (SPACE)"
            onClick={() => dispatch(newGame(answers))}
            className="h-6 w-6 sm:h-7 sm:w-7 fill-neutral-400 hover:fill-green-500 hover:scale-110"
          /> */}
        </div>
        <div className="text-slate-300">
          {status === "win"
            ? winText[row]
            : tips[randomInt(0, tips.length - 1)]}
        </div>
        <Divider />
        <Definition wordle={wordle} />
        <div className="flex flex-wrap mt-6 gap-4 justify-center">
          <NewGameButton onClick={() => dispatch(newGame(answers))} />
          {/* <ShareWordButton onClick={() => console.log("Linked copied")} /> */}
        </div>
        <div className="text-slate-300 mt-12 text-sm">
          *You can also start a new game by pressing SPACEBAR.
        </div>
      </div>
    </div>
  );
};

export default React.memo(GameResult);
