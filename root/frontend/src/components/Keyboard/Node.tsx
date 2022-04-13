import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { CharColor } from "../../types/types";

const backgroundColor: Record<string, string> = {
  init: "bg-gray-600",
  success: "bg-green-600",
  almost: "bg-yellow-600",
  never: "bg-zinc-700",
};

const borderColor: Record<string, string> = {
  init: "border-gray-700",
  success: "border-green-700",
  almost: "border-yellow-700",
  never: "border-zinc-800",
};

interface Props extends React.HTMLAttributes<HTMLElement> {
  pair: CharColor;
}

const Node = ({ className, children, onClick, pair }: Props) => {
  const [nodeTransition, setNodeTransition] = useState({
    bg: "bg-gray-600",
    scale: "scale-100",
    border: "border-gray-700",
  });
  const [slideAnim, setSlideAnim] = useState({
    bg: "bg-gray-600",
    animation: "",
  });

  useEffect(() => {
    if (pair.color === "init") {
      // Reset to default if "init"
      const initBg = backgroundColor[pair.color];
      setSlideAnim({
        bg: initBg,
        animation: "",
      });
      setNodeTransition((previousState) => ({
        ...previousState,
        bg: initBg,
        border: borderColor[pair.color],
      }));
    } else {
      // Start the slide animation
      setSlideAnim({
        bg: backgroundColor[pair.color],
        animation: "animate-keyboard",
      });
      // Start node transition (when need this for onTransitionEnd)
      setNodeTransition((previousState) => ({
        ...previousState,
        scale: "scale-110",
      }));
    }
  }, [pair.color]);

  const nodeClass = classNames(
    className,
    "relative w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded hover:cursor-pointer overflow-x-hidden border-b-4 select-none", // Box size/shape/misc
    "flex justify-center items-center", // Center the character
    "transition ease-in duration-200", // Transition properties
    nodeTransition.bg,
    nodeTransition.scale,
    "border-b-4",
    nodeTransition.border
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
          bg: backgroundColor[pair.color],
          border: borderColor[pair.color],
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
