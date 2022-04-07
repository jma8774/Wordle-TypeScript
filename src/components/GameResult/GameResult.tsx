import classNames from "classnames";
import React, { useEffect } from "react";
import {
  closeGameResult,
  openGameResult,
} from "../../redux/features/setting/settingSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { newGame } from "../../redux/thunkActions/toolbarActions";
import { randomInt } from "../../utils/helper";
import Divider from "../Divider/Divider";
import { RefreshIcon } from "../icons";
import Definition from "./Definition";

const winText = [
  "Nice cheats!",
  "Got it on the first try, luck or skill?",
  "Wow that was fast!",
  "Good job you guessed it!",
  "Phew, that was close!",
  "Could be better, but hey you got it!",
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
    if (status === "ongoing") {
      if (showGameResult) dispatch(closeGameResult());
    } else {
      timeId = setTimeout(() => {
        dispatch(openGameResult());
      }, 1200);
    }

    return () => clearTimeout(timeId);
  }, [status]);

  if (!showGameResult) return null;

  return (
    <div className={containerClass}>
      <div className={bodyClass}>
        <div className="flex items-center">
          <span className="grow font-bold text-3xl">
            {status.toUpperCase()}
          </span>
          <RefreshIcon
            altText="New Game"
            onClick={() => dispatch(newGame(answers))}
            className="h-6 w-6 sm:h-7 sm:w-7 fill-neutral-400 hover:fill-green-500 hover:scale-110"
          />
        </div>
        <div className="text-slate-300">
          {status === "win"
            ? winText[row]
            : tips[randomInt(0, tips.length - 1)]}
        </div>
        <Divider />
        <Definition wordle={wordle} />
        <div>
          Press SPACE or tap the button on the top right to start a new game. 😄
        </div>
        <div className="mt-8"> This section is still a work in progress.</div>
      </div>
    </div>
  );
};

export default React.memo(GameResult);
