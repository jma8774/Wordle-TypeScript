import classNames from "classnames";
import { useState } from "react";
import { toggleShowDebug } from "../../../redux/features/setting/settingSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { EyeIcon } from "./EyeIcon";

const Debug = () => {
  const dispatch = useAppDispatch();
  const { showDebug } = useAppSelector((state) => state.setting);
  const { wordle, status } = useAppSelector((state) => state.game);
  const rowClass = classNames(
    "w-full bg-transparent hover:bg-slate-700/50 rounded p-1 select-all"
  );
  return (
    <div className="flex flex-col mt-10 bg-slate-900 rounded p-4 w-48 shadow-lg">
      <div className="flex">
        <span className="grow font-extrabold text-red-500">DEBUG</span>
        <EyeIcon
          className="self-end hover:cursor-pointer"
          onClick={() => dispatch(toggleShowDebug())}
          open={showDebug}
        />
      </div>
      {showDebug && (
        <span className="mt-2">
          <div className={rowClass}> status: {status}</div>
          <div className={rowClass}> wordle: {wordle} </div>
        </span>
      )}
    </div>
  );
};

export default Debug;
