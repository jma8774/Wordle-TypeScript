import { useAppSelector } from "../../redux/hooks";
import { LinkIcon } from "../icons";

const Definition = ({ wordle }: { wordle: string }) => {
  const { definition } = useAppSelector((state) => state.game);

  return (
    <div className="flex flex-col gap-1 border-2 border-slate-500 border-dashed rounded-lg w-full min-h-[6rem] p-5 mt-2">
      <div className="flex items-center">
        <span className="grow font-semibold text-lg">
          Definition of{" "}
          <span className="tracking-wider">{wordle.toUpperCase()}:</span>
        </span>
        <LinkIcon
          altText="Dictionary Lookup"
          onClick={() =>
            window.open(
              `https://www.merriam-webster.com/dictionary/${wordle}`,
              "_blank"
            )
          }
          className="w-6 h-6 fill-neutral-400 hover:fill-neutral-500"
        />
      </div>
      <div className="text-slate-300">{definition}</div>
    </div>
  );
};

export default Definition;
