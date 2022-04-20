import classNames from "classnames";
import React from "react";
import useNavigateOnChallenge from "../../hooks/useNavigateOutChallenge";
import {
  openChallenge,
  openHelp,
  openStat,
} from "../../redux/features/setting/settingSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { handleHint, newGame } from "../../redux/thunkActions/toolbarActions";
import { Callback } from "../../types/types";
import {
  StatIcon,
  QuestionIcon,
  RefreshIcon,
  CodeIcon,
  LightbulbIcon,
  ChallengeIcon,
} from "../icons";

interface ToolbarProps {
  className?: string;
  answers: string[];
}

const handleCodeClick = () => {
  window.open("https://github.com/jma8774/Wordle-TypeScript", "_blank");
};

const Toolbar = ({ className, answers }: ToolbarProps) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.game.status);
  const { navigateToRoot } = useNavigateOnChallenge();

  // HOF (must pass check before executing)
  const doIfOngoing = (fn: Callback) => {
    return () => {
      if (status === "ongoing") fn();
    };
  };
  const handleGiveHint = () => dispatch(handleHint());
  const handleOpenHelp = () => dispatch(openHelp());
  const handleOpenStat = () => dispatch(openStat());
  const handleOpenChallenge = () => dispatch(openChallenge());
  const handleRefreshGame = () => {
    dispatch(newGame(answers));
    navigateToRoot();
  };

  return (
    <div className={classNames("flex w-full", className)}>
      <span className="flex grow gap-1">
        <RefreshIcon
          altText="New Game (SPACE)"
          onClick={doIfOngoing(handleRefreshGame)}
          className="h-6 w-6 sm:h-7 sm:w-7 fill-neutral-400 hover:fill-neutral-500"
        />
        <LightbulbIcon
          altText="Give Hint"
          onClick={doIfOngoing(handleGiveHint)}
          className="h-6 w-6 sm:h-7 sm:w-7 fill-yellow-600 hover:fill-yellow-400"
        />
      </span>
      <span className="flex gap-1">
        <StatIcon
          altText="View Stats"
          onClick={doIfOngoing(handleOpenStat)}
          className="h-6 w-6 sm:h-7 sm:w-7 stroke-green-400 fill-green-400 hover:fill-green-600 hover:stroke-green-600"
        />
        <ChallengeIcon
          altText="Challenge a Friend"
          onClick={doIfOngoing(handleOpenChallenge)}
          className="h-6 w-6 sm:h-7 sm:w-7 fill-red-500 hover:fill-red-600"
        />
        <QuestionIcon
          altText="How to Play"
          onClick={doIfOngoing(handleOpenHelp)}
          className="h-6 w-6 sm:h-7 sm:w-7 fill-blue-400 hover:fill-blue-600"
        />
        <CodeIcon
          altText="View Code"
          onClick={handleCodeClick}
          className="h-6 w-6 sm:h-7 sm:w-7 fill-neutral-400 hover:fill-neutral-500"
        />
      </span>
    </div>
  );
};

export default React.memo(Toolbar);
