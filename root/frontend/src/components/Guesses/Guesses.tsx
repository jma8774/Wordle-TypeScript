import React from "react";
import { useAppSelector } from "../../redux/hooks";
import Node from "./Node";

interface Props {
  className?: string;
}

const Guesses = ({ className }: Props) => {
  const guesses = useAppSelector((state) => state.guesses.guesses);
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
