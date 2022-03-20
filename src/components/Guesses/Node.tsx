import React, { useState, useEffect } from "react";

const backgroundColor: Record<string, string> = {
  init: "bg-transparent",
  success: "bg-green-600",
  almost: "bg-yellow-600",
  never: "bg-zinc-700",
};

interface CharColor {
  id: number;
  ch: string;
  color: string;
}

interface Props {
  pair: CharColor;
}

const borderColor = ({ ch, color }: CharColor): string => {
  const colorMap: Record<string, string> = {
    success: "border-green-600",
    almost: "border-yellow-600",
    never: "border-zinc-700",
  };
  if (color === "init")
    return ch === " " ? "border-zinc-500" : "border-zinc-700";
  else return colorMap[color];
};

const Node = ({ pair }: Props) => {
  const [transition, setTransition] = useState("scale-100");
  const classNames = [
    backgroundColor[pair.color],
    borderColor(pair),
    transition,
    "w-12 h-12 sm:w-20 sm:h-20 border-2 rounded", // Box size/shape
    "flex justify-center items-center", // Center the character
    "transition ease-linear duration-100", // Transition for new character
  ].join(" ");

  useEffect(() => {
    if (pair.ch === " ") return;
    setTransition("scale-110");
  }, [pair.ch]);

  return (
    <span
      className={classNames}
      onTransitionEnd={() => setTransition("scale-100")}
    >
      {pair.ch.toUpperCase()}
    </span>
  );
};

export default React.memo(Node);
