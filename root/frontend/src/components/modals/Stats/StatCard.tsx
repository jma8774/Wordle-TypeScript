const StatCard = ({
  Icon,
  title,
  body,
}: {
  Icon: JSX.Element;
  title: string;
  body?: string;
}) => {
  return (
    <div className="flex grow gap-3 basis-full sm:basis-1/3 bg-slate-600/25 border border-slate-600 shadow-lg rounded-md p-3 min-h-[56px]">
      {Icon}
      <div className="grow">
        <div className="font-normal"> {title} </div>
        <div className="font-bold text-xl"> {body || "No body"} </div>
      </div>
    </div>
  );
};

export { StatCard };
