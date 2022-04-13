import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { CharColor } from "../../types/types";
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

interface Props extends React.HTMLAttributes<HTMLElement> {
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
  const [color, setColor] = useState({
    background: backgroundColors[pair.color],
    border: getBorderColor(pair),
  });
  const [flipAnimation, setFlipAnimation] = useState({
    animating: false,
    cardAnim: "",
    charAnim: "",
  });
  const animationDelay =
    pair?.id !== undefined ? `animation-delay-${pair.id % WORDLE_LEN}` : ``;

  // Trigger transition animation when user types
  useEffect(() => {
    if (pair.ch === " " || !animate) return;
    setTransition("scale-110");
  }, [pair.ch, animate]);

  // Update border/background color when user submits a word and trigger animation
  useEffect(() => {
    setColor({
      background: backgroundColors[pair.color],
      border: getBorderColor(pair),
    });
    if (pair.color === "init" || !animate) return;
    setFlipAnimation((previousFlipAnimation) => ({
      ...previousFlipAnimation,
      cardAnim: cardAnimation[pair.color],
      charAnim: "animate-flipCharReverse", // Reverse the effect to prevent the character from rotating too
    }));
  }, [pair, animate]);

  const cardClass = classNames(
    transition,
    "w-12 h-12 sm:w-16 sm:h-16 border-2 rounded select-none", // Box size/shape/misc
    "flex justify-center items-center", // Center the character
    "transition ease-linear duration-100", // Transition for new character
    animationDelay,
    flipAnimation.cardAnim ? "bg-transparent" : color.background,
    flipAnimation.cardAnim ? "border-zinc-700" : color.border,
    flipAnimation.cardAnim
  );

  const charClass = classNames("block", flipAnimation.charAnim, animationDelay);

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
