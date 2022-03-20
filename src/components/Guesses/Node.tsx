import React, { useState, useEffect } from "react";

const background: Record<string, string> = {
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
  className?: string;
}

const areEqual = (prevProps: Props, nextProps: Props): boolean => {
  return (
    prevProps.pair.ch === nextProps.pair.ch &&
    prevProps.pair.color === nextProps.pair.color
  );
};

const Node = ({ className, pair }: Props) => {
  const [transition, setTransition] = useState("scale-100");

  useEffect(() => {
    if (pair.ch === " ") return;
    setTransition("scale-110");
  }, [pair.ch]);

  return (
    <span
      className={`${className} ${background[pair.color]} ${
        pair.ch === " " ? "border-zinc-500" : "border-zinc-700"
      } w-16 h-16 text-slate-200 flex justify-center items-center border-2 text-3xl font-bold rounded shadow-md transition ease-linear duration-100 ${transition}`}
      onTransitionEnd={() => setTransition("scale-100")}
    >
      {pair.ch.toUpperCase()}
    </span>
  );
};

export default React.memo(Node, areEqual);
