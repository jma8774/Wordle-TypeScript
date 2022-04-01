import React from "react";
import Node from "./Node";
import { BackspaceIcon } from "../icons";

const rows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

interface Alphabet {
  [key: string]: string;
}

interface Props {
  alphabet: Alphabet;
  handleChar: (ch: string) => void;
  handleBackspace: () => void;
  submitGuess: () => void;
  className: string;
}

const Keyboard = ({
  className,
  alphabet,
  handleChar,
  handleBackspace,
  submitGuess,
}: Props) => {
  const rowClasses = "flex gap-1 sm:gap-1.5 justify-center";
  return (
    <div className={`${className} flex flex-col gap-1 sm:gap-1.5`}>
      <div className={rowClasses}>
        {rows[0].map((ch) => (
          <Node
            key={ch}
            onClick={() => handleChar(ch)}
            pair={{ ch: ch.toUpperCase(), color: alphabet?.[ch] }}
          />
        ))}
      </div>

      <div className={rowClasses}>
        {rows[1].map((ch) => (
          <Node
            key={ch}
            onClick={() => handleChar(ch)}
            pair={{ ch: ch.toUpperCase(), color: alphabet?.[ch] }}
          />
        ))}
      </div>

      <div className={rowClasses}>
        <Node
          onClick={submitGuess}
          className="grow"
          pair={{ ch: "Enter", color: "init" }}
        />
        {rows[2].map((ch) => (
          <Node
            key={ch}
            onClick={() => handleChar(ch)}
            pair={{ ch: ch.toUpperCase(), color: alphabet?.[ch] }}
          />
        ))}
        <Node
          className="grow"
          pair={{ ch: "Back", color: "init" }}
          onClick={handleBackspace}
          children={<BackspaceIcon className="h-6 w-6 sm:h-8 sm:w-8" />}
        />
      </div>
    </div>
  );
};

export default React.memo(Keyboard);
