import classNames from "classnames";
import React, { useState, useEffect } from "react";

const backgroundColor: Record<string, string> = {
  init: "bg-gray-600",
  success: "bg-green-600",
  almost: "bg-yellow-600",
  never: "bg-zinc-700",
};

interface Props {
  className?: string;
  children?: JSX.Element;
  onClick?: () => void;
  pair: CharColor;
}

interface CharColor {
  ch: string;
  color: string;
}

const Node = ({ className, children, onClick, pair }: Props) => {
  const [transition, setTransition] = useState("scale-100");

  useEffect(() => {
    if (pair.color === "init") return;
    setTransition("scale-110");
  }, [pair.color]);

  const containerClass = classNames(
    className,
    backgroundColor[pair.color],
    transition,
    "w-8 h-8 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded hover:cursor-pointer", // Box size/shape
    "flex justify-center items-center", // Center the character
    "transition ease-linear duration-200" // Transition for color change
  );

  return (
    <span
      onClick={onClick}
      className={containerClass}
      onTransitionEnd={() => setTransition("scale-100")}
    >
      {children ? children : pair.ch}
    </span>
  );
};

export default React.memo(Node);
