import classNames from "classnames";
import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";

interface EyeProps extends React.HTMLAttributes<HTMLElement> {
  open: boolean;
}
const EyeIcon = ({ open, className, onClick }: EyeProps) => {
  return (
    <span className={className} onClick={onClick}>
      {open ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 fill-slate-200"
          viewBox="0 0 20 20"
        >
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path
            fillRule="evenodd"
            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 fill-slate-200"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
            clipRule="evenodd"
          />
          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
        </svg>
      )}
    </span>
  );
};

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
