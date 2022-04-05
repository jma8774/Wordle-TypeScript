import { useAppSelector } from "../../redux/hooks";

const Debug = () => {
  const { wordle, status } = useAppSelector((state) => state.game);
  const { row, col } = useAppSelector((state) => state.guesses);
  return (
    <div className="flex flex-col items-center mt-10 bg-slate-900 rounded p-5">
      <span className="font-bold text-red-500">DEBUG</span>
      <span> status: {status}</span>
      <span> row: {row} </span>
      <span> col: {col} </span>
      <span> wordle: {wordle} </span>
    </div>
  );
};

export default Debug;
