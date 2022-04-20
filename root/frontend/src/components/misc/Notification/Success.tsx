import React from "react";

interface Props {
  title?: string;
  body?: string;
  onClick?: () => void;
}

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 fill-green-600 shrink-0"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const Success = ({ title, body, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="flex gap-2 bg-slate-200 w-64 sm:w-80 min-h-[5rem] p-2 shadow-xl rounded-md border-l-4 border-green-600 animate-notification hover:cursor-pointer"
    >
      <CheckIcon />
      <div className="grow flex flex-col gap-1">
        <div className="font-bold"> {title || "Success Title"} </div>
        <div className="text-slate-800 font-[450]">
          {body || "Success Body"}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Success);
