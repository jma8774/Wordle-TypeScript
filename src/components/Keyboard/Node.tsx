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
  const [nodeTransition, setNodeTransition] = useState({
    bg: "bg-gray-600",
    scale: "scale-100",
  });
  const [slideAnim, setSlideAnim] = useState({
    bg: "bg-gray-600",
    animation: "",
  });

  useEffect(() => {
    if (pair.color === "init") {
      // Reset to default if "init"
      const initColor = backgroundColor[pair.color];
      setSlideAnim({
        bg: initColor,
        animation: "",
      });
      setNodeTransition((previousState) => ({
        ...previousState,
        bg: initColor,
      }));
    } else {
      // Change to corresponding color and trigger animations
      setSlideAnim({
        bg: backgroundColor[pair.color],
        animation: "animate-keyboard",
      });
      setNodeTransition((previousState) => ({
        ...previousState,
        scale: "scale-110",
      }));
    }
  }, [pair.color]);

  const nodeClass = classNames(
    className,
    "w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded hover:cursor-pointer overflow-hidden", // Box size/shape
    "flex justify-center items-center", // Center the character
    "transition ease-in duration-200", // Transition properties
    nodeTransition.bg,
    nodeTransition.scale
  );

  const slideAnimClass = classNames(
    "absolute w-full h-full left-[-100%]",
    slideAnim.bg,
    slideAnim.animation
  );

  return (
    <span
      onClick={onClick}
      className={nodeClass}
      onTransitionEnd={() =>
        // When transition finishes, revert back to original scale + change to correct color
        setNodeTransition({
          bg: slideAnim.bg,
          scale: "scale-100",
        })
      }
    >
      <span
        className={slideAnimClass}
        onAnimationEnd={() => setSlideAnim({ ...slideAnim, animation: "" })}
      />
      <span className="relative"> {children ? children : pair.ch} </span>
    </span>
  );
};

export default React.memo(Node);
