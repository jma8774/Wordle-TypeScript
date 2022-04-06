import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { WORDLE_LEN } from "../../utils/constants";
import "./Node.css";

const backgroundColors: Record<string, string> = {
  init: "bg-transparent",
  success: "bg-green-600",
  almost: "bg-yellow-600",
  never: "bg-zinc-700",
};

const cardAnimation: Record<string, string> = {
  success: "animate-flipSuccess",
  almost: "animate-flipAlmost",
  never: "animate-flipNever",
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

const getBorderColor = ({ ch, color }: CharColor): string => {
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
    animating: false,
    cardAnim: "",
    charAnim: "",
  });
  const animationDelay =
    pair?.id !== undefined ? `animation-delay-${pair.id % WORDLE_LEN}` : ``;
  // hacky fix for: this prevents animation blinking effect at the beginning or end on different browsers (safari, firefox, chrome, edge)
  const allBrowserIsAnimating =
    !flipAnimation.animating && flipAnimation.cardAnim;

  const cardClass = classNames(
    transition,
    flipAnimation.cardAnim,
    "w-12 h-12 sm:w-16 sm:h-16 border-2 rounded", // Box size/shape
    "flex justify-center items-center", // Center the character
    "transition ease-linear duration-100", // Transition for new character
    animationDelay,
    allBrowserIsAnimating ? "bg-transparent" : backgroundColors[pair.color],
    allBrowserIsAnimating ? "border-zinc-700" : getBorderColor(pair)
  );

  const charClass = classNames(flipAnimation.charAnim, animationDelay);

  useEffect(() => {
    if (pair.ch === " " || !animate) return;
    setTransition("scale-110");
  }, [pair.ch]);

  useEffect(() => {
    if (pair.color === "init" || !animate) return;
    setFlipAnimation({
      ...flipAnimation,
      cardAnim: cardAnimation[pair.color],
      charAnim: "animate-flipCharReverse", // Reverse the effect to prevent the character from rotating too
    });
  }, [pair.color]);

  return (
    <span
      className={cardClass}
      onTransitionEnd={() => setTransition("scale-100")}
      onAnimationStart={() =>
        setFlipAnimation({ ...flipAnimation, animating: true })
      }
      onAnimationEnd={() => {
        setFlipAnimation({ animating: false, cardAnim: "", charAnim: "" });
      }}
    >
      <span className={charClass}>{pair.ch.toUpperCase()}</span>
    </span>
  );
};

export default React.memo(Node);
