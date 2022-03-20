import React from "react";
import ButtonWrapper from "../buttons/ButtonWrapper";
import { StatIcon, QuestionIcon, RefreshIcon } from "../icons";

interface ToolbarProps {
  className?: string;
  handleRefresh: () => void;
}

const handleStatClick = () => {
  console.log("Stat icon clicked");
  alert("Stat icon clicked");
};

const handleQuestionClick = () => {
  console.log("Setting icon clicked");
  alert("Setting icon clicked");
};

const Toolbar = ({ className, handleRefresh }: ToolbarProps) => {
  console.log("Log: render toolbar");
  return (
    <div className={`${className} flex w-full`}>
      <span className="grow">
        <RefreshIcon
          onClick={handleRefresh}
          className="h-8 w-8 400 fill-neutral-400 hover:fill-neutral-500"
        />
      </span>
      <StatIcon
        onClick={handleStatClick}
        className="h-8 w-8 stroke-green-400 fill-green-400 hover:fill-green-600 hover:stroke-green-600"
      />
      <QuestionIcon
        onClick={handleQuestionClick}
        className="h-8 w-8 fill-blue-400 hover:fill-blue-600"
      />
    </div>
  );
};

export default React.memo(Toolbar);
