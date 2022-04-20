import React, { useRef, useState } from "react";
import useCloseOnClickOutside from "../../../hooks/useCloseOnClickOutside";
import { resetModals } from "../../../redux/features/setting/settingSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { handleResetStats } from "../../../redux/thunkActions/toolbarActions";
import Divider from "../../misc/Divider/Divider";
import { CloseIcon } from "../../icons";
import { DistributionCard } from "./DistributionCard";
import { StatCard } from "./StatCard";
import {
  CurrentStreakIcon,
  PlayedIcon,
  StreakIcon,
  WonIcon,
} from "./StatIcons";

const GarbageIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 stroke-slate-200 rounded mx-auto animate-modal"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
};

interface Props {}

const Stats = (props: Props) => {
  const dispatch = useAppDispatch();
  const [deleteOnce, setDeleteOnce] = useState(false);
  const { gamesPlayed, gamesWon, currentStreak, longestStreak } =
    useAppSelector((state) => state.localStorage);
  const { showStat } = useAppSelector((state) => state.setting);
  const ref = useRef<HTMLDivElement>(null);
  useCloseOnClickOutside(ref, () => {
    dispatch(resetModals());
    setDeleteOnce(false);
  });

  if (!showStat) return null;

  const handleDelete = () => {
    if (!deleteOnce) return setDeleteOnce(true);
    dispatch(handleResetStats());
    setDeleteOnce(false);
  };

  return (
    <div className="absolute bg-transparent w-screen h-screen z-10">
      <div
        className="relative flex flex-col gap-2 border-2 border-slate-700 bg-slate-800 max-w-sm sm:max-w-lg mx-auto my-28 p-5 rounded text-slate-200 animate-modal"
        ref={ref}
      >
        <span className="flex items-center">
          <div className="grow font-bold text-3xl w-60">Statistics</div>
          <CloseIcon
            onClick={() => dispatch(resetModals())}
            className="h-6 w-6 sm:h-7 sm:w-7 fill-red-400 hover:fill-red-500"
          />
        </span>
        <div className="text-slate-300">You can view your progress here.</div>
        <Divider />
        <div className="flex gap-2 flex-wrap mt-1">
          <StatCard
            Icon={<PlayedIcon />}
            title="Games Played"
            body={gamesPlayed.toString()}
          />
          <StatCard
            Icon={<WonIcon />}
            title="Games Won"
            body={gamesWon.toString()}
          />
          <StatCard
            Icon={<StreakIcon />}
            title="Longest Streak"
            body={longestStreak.toString()}
          />
          <StatCard
            Icon={<CurrentStreakIcon />}
            title="Current Streak"
            body={currentStreak.toString()}
          />
          <DistributionCard />
          <div className="flex justify-end w-full mt-1">
            <button
              aria-label={deleteOnce ? "Confirm Reset" : "Reset Stats"}
              onClick={handleDelete}
              className="bg-red-500/25 hover:bg-red-600/70 border border-red-600 rounded p-2 h-11 w-24 select-none"
            >
              {deleteOnce ? <GarbageIcon /> : "Reset"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Stats);
