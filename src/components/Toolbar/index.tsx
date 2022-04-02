import classNames from "classnames";
import React from "react";
import { useAppDispatch } from "../../redux/hooks";
import { showHelp, showStat } from "../../redux/features/setting/settingSlice";
import {
  StatIcon,
  QuestionIcon,
  RefreshIcon,
  CodeIcon,
  LightbulbIcon,
} from "../icons";

interface ToolbarProps {
  className?: string;
  handleRefresh: () => void;
  handleHint: () => void;
}

const handleCodeClick = () => {
  window.open("https://github.com/jma8774/Wordle-TypeScript", "_blank");
};

const Toolbar = ({ className, handleRefresh, handleHint }: ToolbarProps) => {
  const dispatch = useAppDispatch();
  const containerClass = classNames("flex w-full", className);
  return (
    <div className={containerClass}>
      <span className="flex grow gap-1">
        <RefreshIcon
          onClick={handleRefresh}
          className="h-6 w-6 sm:h-7 sm:w-7 fill-neutral-400 hover:fill-neutral-500"
        />
        <LightbulbIcon
          onClick={handleHint}
          className="h-6 w-6 sm:h-7 sm:w-7 fill-yellow-500 hover:fill-yellow-600"
        />
      </span>
      <span className="flex gap-1">
        <StatIcon
          onClick={() => dispatch(showStat())}
          className="h-6 w-6 sm:h-7 sm:w-7 stroke-green-400 fill-green-400 hover:fill-green-600 hover:stroke-green-600"
        />
        <QuestionIcon
          onClick={() => dispatch(showHelp())}
          className="h-6 w-6 sm:h-7 sm:w-7 fill-blue-400 hover:fill-blue-600"
        />
        <CodeIcon
          onClick={handleCodeClick}
          className="h-6 w-6 sm:h-7 sm:w-7 fill-neutral-400 hover:fill-neutral-500"
        />
      </span>
    </div>
  );
};

export default React.memo(Toolbar);
