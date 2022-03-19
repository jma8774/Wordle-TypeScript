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
    <div className={`${className} bg-black`}>
      {guesses.map((guess, index) => (
        <div key={index} className="flex justify-center gap-2">
          {guess.map((pair, index) => (
            <Node key={`${pair.ch}${index}`} pair={pair} />
          ))}
        </div>
      ))}
    </div>
    // <div className={`${className} bg-slate-900 rounded-md p-5`}>
    //   {guesses.map((guess, index) => (
    //     <div key={index} className="flex">
    //       <span className="flex-1">
    //         guess #{index + 1}:&nbsp;
    //         {guess.map((pair, index) => (
    //           <Node key={`${pair.ch}${index}`} pair={pair} />
    //         ))}
    //       </span>
    //       {index === row && <span> &lt;&lt; </span>}
    //     </div>
    //   ))}
    // </div>
  );
};

export default React.memo(Guesses);
