import classNames from "classnames";
import React, { useEffect } from "react";
import { openGameResult } from "../../redux/features/setting/settingSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { newGame } from "../../redux/thunkActions/toolbarActions";
import { randomInt } from "../../utils/helper";
import Divider from "../Divider/Divider";
import Definition from "./Definition";
import { NewGameButton } from "./NewGameButton";

const winText = [
  "First try? Nice cheats! 😂",
  "Got it on the second try, is this luck or skill?",
  "Wow that was fast!",
  "Nicely done, you're getting better and better!",
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
    "relative flex flex-col gap-2 border-2 border-slate-700 bg-slate-800 max-w-sm sm:max-w-lg mx-auto my-28 p-5 rounded text-slate-200 animate-gameScreen"
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
        </div>
        <div className="text-slate-300">
          {status === "win"
            ? winText[row - 1]
            : tips[randomInt(0, tips.length - 1)]}
        </div>
        <Divider />
        <Definition wordle={wordle} />
        <div className="flex flex-wrap mt-6 gap-4 justify-center">
          <NewGameButton onClick={() => dispatch(newGame(answers))} />
          {/* <ShareWordButton onClick={() => console.log("Linked copied")} /> */}
        </div>
        <div className="relative text-slate-300 mt-12 text-sm">
          *You can also start a new game by pressing SPACEBAR.
        </div>
      </div>
    </div>
  );
};

export default React.memo(GameResult);
