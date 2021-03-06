import classNames from "classnames";
import React, { useEffect } from "react";
import useNavigateOnChallenge from "../../../hooks/useNavigateOutChallenge";
import { openGameResult } from "../../../redux/features/setting/settingSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { newGame } from "../../../redux/thunkActions/toolbarActions";
import { randomInt } from "../../../utils/helper";
import Divider from "../../misc/Divider/Divider";
import Definition from "./Definition";
import { NewGameButton } from "./NewGameButton";
import { Time } from "./Time";

const winText = [
  "First guess? Nice cheats! 😂",
  "Got it on the second guess, is this luck or skill?",
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

const containerClass = classNames(
  "absolute bg-transparent w-screen h-screen z-10"
);

const bodyClass = classNames(
  "relative flex flex-col gap-2 border-2 border-slate-700 bg-slate-800 max-w-sm sm:max-w-lg mx-auto my-28 p-5 rounded text-slate-200 animate-gameScreen"
);

interface Props {
  answers: string[];
}

const GameResult = ({ answers }: Props) => {
  const dispatch = useAppDispatch();
  const { wordle, status } = useAppSelector((state) => state.game);
  const row = useAppSelector((state) => state.guesses.row);
  const showGameResult = useAppSelector(
    (state) => state.setting.showGameResult
  );
  const { navigateToRoot } = useNavigateOnChallenge();

  const handleNewGame = () => {
    dispatch(newGame(answers));
    navigateToRoot();
  };

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
          <Time />
        </div>
        <div className="text-slate-300">
          {status === "win"
            ? winText[row - 1]
            : tips[randomInt(0, tips.length - 1)]}
        </div>
        <Divider />
        <Definition wordle={wordle} />
        <div className="flex flex-wrap my-6 gap-4 justify-center">
          <NewGameButton onClick={handleNewGame} win={status === "win"} />
          {/* <ShareWordButton onClick={() => console.log("Linked copied")} /> */}
        </div>
      </div>
    </div>
  );
};

export default React.memo(GameResult);
