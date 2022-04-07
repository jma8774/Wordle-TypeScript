import classNames from "classnames";
import React, { useEffect, useState } from "react";
import {
  closeGameResult,
  openGameResult,
} from "../../redux/features/setting/settingSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { newGame } from "../../redux/thunkActions/toolbarActions";
import Divider from "../Divider/Divider";

interface Props {
  answers: string[];
}

const GameResult = ({ answers }: Props) => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.game);
  const { showGameResult } = useAppSelector((state) => state.setting);
  const containerClass = classNames(
    "absolute bg-transparent w-screen h-screen z-10"
  );
  const bodyClass = classNames(
    "flex flex-col gap-2 border-2 border-slate-700 bg-slate-800 max-w-sm sm:max-w-lg mx-auto my-28 p-5 rounded text-slate-200 animate-gameScreen"
  );

  useEffect(() => {
    let timeId: NodeJS.Timeout;
    if (status === "ongoing") {
      dispatch(closeGameResult());
    } else {
      timeId = setTimeout(() => {
        dispatch(openGameResult());
      }, 1200);
    }

    return () => clearTimeout(timeId);
  }, [status]);

  if (!showGameResult) return null;

  return (
    <div className={containerClass} onClick={() => dispatch(newGame(answers))}>
      <div className={bodyClass}>
        <span className="font-bold text-3xl">Game Result (WIP)</span>
        <Divider />
        <div>You {status.toUpperCase()}!</div>
        <div>
          Press SPACE to start a new game or tap your screen if you're on
          mobile! 😄
        </div>
      </div>
    </div>
  );
};

export default React.memo(GameResult);
