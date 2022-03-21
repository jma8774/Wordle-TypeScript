import React from "react";
import Node from "./Node";

interface CharColor {
  id: number;
  ch: string;
  color: string;
}

interface Props {
  guesses: CharColor[][];
  className?: string;
}

const Guesses = ({ className, guesses }: Props) => {
  console.log("Log: render guesses");
  return (
    <div className={className}>
      {guesses.map((guess, index) => (
        <div key={index} className="flex gap-1.5 mt-1.5 text-3xl font-bold">
          {guess.map((pair) => (
            <Node key={pair.id} pair={pair} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default React.memo(Guesses);
