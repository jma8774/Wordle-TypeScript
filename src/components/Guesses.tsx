import React from "react";
import Node from "./Node";

interface CharColor {
  ch: string;
  color: string;
}

interface Props {
  guesses: CharColor[][];
  row: number;
}

const Guesses = ({ guesses, row }: Props) => {
  console.log("Log: render guesses");
  return (
    <>
      {guesses.map((guess, index) => (
        <div key={index}>
          {`guess #${index + 1}: `}
          {guess.map((pair, index) => (
            <Node key={`${pair.ch}${index}`} pair={pair} />
          ))}
          {index === row && <span> &lt;&lt; </span>}
        </div>
      ))}
    </>
  );
};

export default React.memo(Guesses);
