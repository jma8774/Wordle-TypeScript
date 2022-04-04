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
    <div className="flex gap-3">
      <div>{row}</div>
      <div
        style={{ flexBasis: `${percent}%` }}
        className="text-right rounded bg-blue-600 px-1"
      >
        {wins}
      </div>
    </div>
  );
};

const DistributionCard = () => {
  const totalWins = 999;
  const distributions = [0, 200, 300, 200, 100, 99];
  return (
    <div className="flex flex-col gap-2 grow basis-full min-h-[120px] text-slate-200 mt-1">
      <div className="text-lg font-semibold"> Guess Distribution </div>
      {distributions.map((wins, idx) => (
        <Bar
          key={idx}
          row={idx + 1}
          wins={wins}
          percent={Math.floor((wins / totalWins) * 100)}
        />
      ))}
    </div>
  );
};

export { DistributionCard };
