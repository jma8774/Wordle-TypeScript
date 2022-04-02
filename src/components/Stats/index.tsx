import React, { useRef } from "react";
import useCloseOnClickOutside from "../../hooks/useCloseOnClickOutside";
import { resetModals } from "../../redux/features/setting/settingSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { CloseIcon } from "../icons";

interface Props {}

const Stats = (props: Props) => {
  const dispatch = useAppDispatch();
  const { showStat } = useAppSelector((state) => state.setting);
  const ref = useRef<HTMLDivElement>(null);
  useCloseOnClickOutside(ref, () => dispatch(resetModals()));

  if (!showStat) return null;

  return (
    <div className="absolute bg-transparent w-screen h-screen z-10">
      <div
        className="flex flex-col gap-2 border-2 border-slate-700 bg-slate-800 w-max mx-auto my-28 p-5 rounded text-slate-200 animate-modal"
        ref={ref}
      >
        <span className="flex items-center">
          <div className="grow font-bold text-3xl">Statistics</div>
          <CloseIcon
            onClick={() => dispatch(resetModals())}
            className="h-6 w-6 sm:h-7 sm:w-7 fill-red-400 hover:fill-red-500"
          />
        </span>
      </div>
    </div>
  );
};

export default React.memo(Stats);
