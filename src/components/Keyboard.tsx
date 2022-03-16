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
}

const Keyboard = ({ alphabet }: Props) => {
  console.log("Log: render keyboard");
  return (
    <>
      {rows.map((characters, index) => (
        <div key={index}>
          {characters.map((ch) => (
            <Node
              key={ch}
              pair={{ ch: ch.toUpperCase(), color: alphabet[ch] }}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default React.memo(Keyboard);
