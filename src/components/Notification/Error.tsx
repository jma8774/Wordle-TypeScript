import React from "react";

interface Props {
  title?: string;
  body?: string;
}

const ErrorIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 fill-red-600 shrink-0"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const Error = ({ title, body }: Props) => {
  return (
    <div className="flex gap-2 bg-slate-200 w-64 sm:w-80 min-h-[5rem] p-2 shadow-xl rounded-md border-l-4 border-red-600 animate-notification">
      <ErrorIcon />
      <div className="grow flex flex-col gap-1">
        <div className="font-bold"> {title || "Error Title"} </div>
        <div className="text-slate-800 font-[450]">{body || "Error Body"}</div>
      </div>
    </div>
  );
};

export default React.memo(Error);
