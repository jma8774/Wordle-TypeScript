import React, { useRef } from "react";
import useCloseOnClickOutside from "../../hooks/useCloseOnClickOutside";
import { batchResetStats } from "../../redux/batches";
import { resetStats } from "../../redux/features/localStorage/localStorageSlice";
import { resetModals } from "../../redux/features/setting/settingSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Divider from "../Divider";
import { CloseIcon } from "../icons";
import { DistributionCard } from "./DistributionCard";
import { StatCard } from "./StatCard";
import {
  CurrentStreakIcon,
  PlayedIcon,
  StreakIcon,
  WonIcon,
} from "./StatIcons";

interface Props {}

const Stats = (props: Props) => {
  const dispatch = useAppDispatch();
  const { gamesPlayed, gamesWon, currentStreak, longestStreak } =
    useAppSelector((state) => state.localStorage);
  const { showStat } = useAppSelector((state) => state.setting);
  const ref = useRef<HTMLDivElement>(null);
  useCloseOnClickOutside(ref, () => dispatch(resetModals()));

  if (!showStat) return null;

  return (
    <div className="absolute bg-transparent w-screen h-screen z-10">
      <div
        className="flex flex-col gap-2 border-2 border-slate-700 bg-slate-800 max-w-sm sm:max-w-lg mx-auto my-28 p-5 rounded text-slate-200 animate-modal"
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
              onClick={batchResetStats}
              className="bg-red-500 hover:bg-red-600 rounded p-2 w-20"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Stats);
