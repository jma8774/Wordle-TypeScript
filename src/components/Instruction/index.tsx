import React, { useRef } from "react";
import useCloseOnClickOutside from "../../hooks/useCloseOnClickOutside";
import { resetModals } from "../../redux/features/setting/settingSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { CloseIcon } from "../icons";
import { Divider } from "../";
import Node from "../Guesses/Node";

interface Props {}

const Row = ({
  wordle,
  guess,
  colorCol,
}: {
  wordle: string;
  guess: string;
  colorCol: number;
}) => {
  const getColor = (i: number): "init" | "almost" | "success" | "never" => {
    if (i !== colorCol) return "init";
    if (guess[i] === wordle[i]) return "success";
    return wordle.includes(guess[i]) ? "almost" : "never";
  };

  return (
    <div className="flex gap-1.5 mt-1.5 text-3xl font-bold">
      {Array.from(guess).map((ch, idx) => {
        return <Node key={idx} pair={{ ch: ch, color: getColor(idx) }} />;
      })}
    </div>
  );
};

const WrapText = ({ text }: { text: string }) => {
  return <div className="max-w-fit"> {text} </div>;
};

const Instuction = (props: Props) => {
  const dispatch = useAppDispatch();
  const { showHelp } = useAppSelector((state) => state.setting);
  const ref = useRef<HTMLDivElement>(null);
  useCloseOnClickOutside(ref, () => dispatch(resetModals()));

  if (!showHelp) return null;

  return (
    <div className="absolute bg-transparent w-screen h-screen z-10">
      <div
        className="flex flex-col gap-2 border-2 border-slate-700 bg-slate-800 w-max mx-auto my-28 p-5 rounded text-slate-200 animate-modal"
        ref={ref}
      >
        <span className="flex items-center">
          <div className="grow font-bold text-3xl">How to Play</div>
          <CloseIcon
            onClick={() => dispatch(resetModals())}
            className="h-6 w-6 sm:h-7 sm:w-7 fill-red-400 hover:fill-red-500"
          />
        </span>
        <div className="max-w-fit">Try to guess the word in 6 tries.</div>
        <Divider pb={5} pt={10} />
        <Row guess="hello" wordle="h####" colorCol={0} />
        <WrapText text="The letter H is in the word and in the correct spot." />
        <Row guess="world" wordle="o####" colorCol={1} />
        <WrapText text="The letter O is in the word but in the wrong spot." />
        <Row guess="smile" wordle="#####" colorCol={3} />
        <WrapText text="The letter L is not in the word in any spot." />
      </div>
    </div>
  );
};

export default React.memo(Instuction);
