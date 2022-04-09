import classNames from "classnames";
import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { EyeIcon } from "./EyeIcon";

const Debug = () => {
  const { wordle, status } = useAppSelector((state) => state.game);
  const [open, setOpen] = useState(false);
  const rowClass = classNames(
    "w-full bg-transparent hover:bg-slate-700/50 rounded p-1 select-all"
  );
  return (
    <div className="flex flex-col mt-10 bg-slate-900 rounded p-4 w-48 shadow-lg">
      <div className="flex">
        <span className="grow font-extrabold text-red-500">DEBUG</span>
        <EyeIcon
          className="self-end hover:cursor-pointer"
          onClick={() => setOpen(!open)}
          open={open}
        />
      </div>
      {open && (
        <span className="mt-2">
          <div className={rowClass}> status: {status}</div>
          <div className={rowClass}> wordle: {wordle} </div>
        </span>
      )}
    </div>
  );
};

export default Debug;
