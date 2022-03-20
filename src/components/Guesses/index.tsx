import React from "react";
import Node from "./Node";

interface CharColor {
  id: number;
  ch: string;
  color: string;
}

interface Props {
  guesses: CharColor[][];
  row: number;
  className: string;
}

const Guesses = ({ className, guesses, row }: Props) => {
  console.log("Log: render guesses");
  return (
    <div className={`${className}`}>
      {guesses.map((guess, index) => (
        <div key={index} className="flex justify-center gap-1.5 mt-1.5">
          {guess.map((pair) => (
            <Node key={pair.id} pair={pair} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default React.memo(Guesses);
