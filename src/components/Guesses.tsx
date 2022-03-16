import React from "react";
import Node from "./Node";

interface CharColor {
  ch: string;
  color: string;
}

interface Props {
  guesses: CharColor[][];
}

const Guesses = ({ guesses }: Props) => {
  console.log('log: render guesses')
  return(
    <>
      {guesses.map((guess, index) => (
        <div key={index}>
          {`guess #${index + 1}: `}
          {guess.map((pair, index) => (
            <Node key={`${pair.ch}${index}`} pair={pair} />
          ))}
        </div>
      ))}
    </>
  )
}

export default React.memo(Guesses)