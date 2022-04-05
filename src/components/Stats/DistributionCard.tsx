import { useAppSelector } from "../../redux/hooks";

const Bar = ({
  row,
  wins,
  percent,
}: {
  row: number;
  wins: number;
  percent: number;
}) => {
  return (
    <div className="flex">
      <div className="w-4 shrink-0">{row}</div>
      <div
        style={{ flexBasis: `${percent}%` }}
        className={`text-right rounded bg-blue-600 px-1`}
      >
        {wins}
      </div>
    </div>
  );
};

const DistributionCard = () => {
  const { gamesWon, distribution } = useAppSelector(
    (state) => state.localStorage
  );
  return (
    <div className="flex flex-col gap-2 grow basis-full min-h-[120px] text-slate-200 mt-1">
      <div className="text-lg font-semibold"> Guess Distribution </div>
      {Object.values(distribution).map((wins, idx) => (
        <Bar
          key={idx}
          row={idx + 1}
          wins={wins}
          percent={Math.floor((wins / gamesWon) * 100)}
        />
      ))}
    </div>
  );
};

export { DistributionCard };
