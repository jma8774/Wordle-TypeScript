import React from "react";
import Node from "./Node";

interface CharColor {
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
    <span className={className}>
      <div className="bg-slate-900 rounded-sm p-5 w-56">
        {guesses.map((guess, index) => (
          <div className="flex">
            <span key={index} className="flex-1">
              guess #{index + 1}:&nbsp;
              {guess.map((pair, index) => (
                <Node key={`${pair.ch}${index}`} pair={pair} />
              ))}
            </span>
            {index === row && <span> &lt;&lt; </span>}
          </div>
        ))}
      </div>
    </span>
  );
};

export default React.memo(Guesses);
