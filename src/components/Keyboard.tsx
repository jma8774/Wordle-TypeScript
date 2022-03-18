import React from "react";
import Node from "./Node";

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
  className: string;
}

const Keyboard = ({ className, alphabet }: Props) => {
  console.log("Log: render keyboard");
  return (
    <div className={`${className} flex flex-col items-center`}>
      {rows.map((characters, index) => (
        <div key={index}>
          {characters.map((ch) => (
            <Node
              key={ch}
              className="mx-0.5"
              pair={{ ch: ch.toUpperCase(), color: alphabet[ch] }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default React.memo(Keyboard);
