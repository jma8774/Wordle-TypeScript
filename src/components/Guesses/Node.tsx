import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { WORDLE_LEN } from "../../utils/constants";
import "./Node.css";

const backgroundColor: Record<string, string> = {
  init: "bg-transparent",
  success: "bg-green-600",
  almost: "bg-yellow-600",
  never: "bg-zinc-700",
};

const cardAnimation: Record<string, string> = {
  success: "animate-charFlipSuccess",
  almost: "animate-charFlipAlmost",
  never: "animate-charFlipNever",
};

interface CharColor {
  id?: number;
  ch: string;
  color: string;
}

interface Props {
  pair: CharColor;
  animate?: boolean;
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

const Node = ({ pair, animate = true }: Props) => {
  const [transition, setTransition] = useState("scale-100");
  const [flipAnimation, setFlipAnimation] = useState({
    card: "",
    char: "",
  });
  const animationDelay =
    pair?.id !== undefined ? `animation-delay-${pair.id % WORDLE_LEN}` : ``;

  const cardClass = classNames(
    flipAnimation.card ? "bg-transparent" : backgroundColor[pair.color],
    flipAnimation.card ? "border-zinc-700" : borderColor(pair),
    transition,
    flipAnimation.card,
    "w-12 h-12 sm:w-16 sm:h-16 border-2 rounded", // Box size/shape
    "flex justify-center items-center", // Center the character
    "transition ease-linear duration-100", // Transition for new character
    animationDelay
  );

  const charClass = classNames(flipAnimation.char, animationDelay);

  useEffect(() => {
    if (pair.ch === " " || !animate) return;
    setTransition("scale-110");
  }, [pair.ch]);

  useEffect(() => {
    if (pair.color === "init" || !animate) return;
    setFlipAnimation({
      card: cardAnimation[pair.color],
      char: "animate-reverseCharFlip", // Reverse the effect to prevent the character from rotating too
    });
  }, [pair.color]);

  return (
    <span
      className={cardClass}
      onTransitionEnd={() => setTransition("scale-100")}
      onAnimationEnd={() => setFlipAnimation({ card: "", char: "" })}
    >
      <span className={charClass}>{pair.ch.toUpperCase()}</span>
    </span>
  );
};

export default React.memo(Node);
