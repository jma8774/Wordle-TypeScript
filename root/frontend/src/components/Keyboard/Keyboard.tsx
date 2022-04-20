import React from "react";
import Node from "./Node";
import { BackspaceIcon } from "../icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  submitBackspace,
  submitChar,
  submitWord,
} from "../../redux/thunkActions/gameActions";

const rows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

interface Props {
  className: string;
  words: Set<string>;
}

const Keyboard = ({ className, words }: Props) => {
  const dispatch = useAppDispatch();
  const { keyboard } = useAppSelector((state) => state.keyboard);

  const handleChar = (ch: string) => {
    dispatch(submitChar(ch));
  };

  const handleBackspace = () => {
    dispatch(submitBackspace());
  };

  const handleSubmit = () => {
    dispatch(submitWord(words));
  };

  const rowClasses = "flex gap-1.5 justify-center";
  return (
    <div className={`${className} flex flex-col gap-1.5`}>
      <div className={rowClasses}>
        {rows[0].map((ch) => (
          <Node
            key={ch}
            onClick={() => handleChar(ch)}
            pair={{ id: -1, ch: ch.toUpperCase(), color: keyboard?.[ch] }}
          />
        ))}
      </div>

      <div className={rowClasses}>
        {rows[1].map((ch) => (
          <Node
            key={ch}
            onClick={() => handleChar(ch)}
            pair={{ id: -1, ch: ch.toUpperCase(), color: keyboard?.[ch] }}
          />
        ))}
      </div>

      <div className={rowClasses}>
        <Node
          onClick={handleSubmit}
          className="grow"
          pair={{ id: -1, ch: "Enter", color: "init" }}
        />
        {rows[2].map((ch) => (
          <Node
            key={ch}
            onClick={() => handleChar(ch)}
            pair={{ id: -1, ch: ch.toUpperCase(), color: keyboard?.[ch] }}
          />
        ))}
        <Node
          className="grow"
          pair={{ id: -1, ch: "Back", color: "init" }}
          onClick={handleBackspace}
          children={<BackspaceIcon className="h-6 w-6 sm:h-8 sm:w-8" />}
        />
      </div>
    </div>
  );
};

export default React.memo(Keyboard);
