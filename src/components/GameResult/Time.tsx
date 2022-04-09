import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

const TimeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

const formatTime = (timeStart: number, timeEnd: number): string => {
  const MIN = 60;
  const HOUR = 60 * 60;
  const elapsedSeconds = Math.ceil((timeEnd - timeStart) / 1000);
  if (elapsedSeconds < MIN) {
    return `${elapsedSeconds}s`;
  } else if (elapsedSeconds < HOUR) {
    return `${Math.floor(elapsedSeconds / MIN)}m ${elapsedSeconds % MIN}s`;
  }
  return `${Math.floor(elapsedSeconds / HOUR)}h`;
};

const Time = () => {
  const { timeStart, timeEnd } = useAppSelector(
    (state: RootState) => state.game
  );
  return (
    <>
      <TimeIcon />
      <div className="ml-1 font-light">{formatTime(timeStart, timeEnd)}</div>
    </>
  );
};

export { Time };
