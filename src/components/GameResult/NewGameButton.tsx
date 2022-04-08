import classNames from "classnames";
import React, { useState } from "react";
import { IconProps } from "../../types/propTypes";

const Icon = ({ className }: IconProps) => {
  const iconClass = classNames(className, "h-5 w-5 fill-green-600");
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 fill-slate-200"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <title> New Game </title>
      <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
    </svg>
  );
};

const NewGameButton = ({ onClick }: React.HTMLAttributes<HTMLElement>) => {
  const [isHover, setIsHover] = useState(false);
  const buttonClass = classNames(
    "relative flex items-center justify-center", // Flex props
    "border-b-4 border-green-700", // Border
    "rounded-md overflow-hidden min-w-[7rem] min-h-[3rem] shadow-md text-slate-200 bg-green-600",
    isHover && "animate-buttonSurprise"
  );
  const iconClass = classNames("scale-125");
  return (
    <button
      onClick={onClick}
      className={buttonClass}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <span className={iconClass}>
        <Icon />
      </span>
    </button>
  );
};

export { NewGameButton };
