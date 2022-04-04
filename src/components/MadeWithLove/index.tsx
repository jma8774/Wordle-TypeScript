const MadeWithLove = () => {
  return (
    <div className="grow mt-28 mb-4 w-72 text-slate-200 text-center font-thin">
      Made with ❤️ by
      <span
        onClick={() => window.open("https://github.com/jma8774", "_blank")}
        className="hover:cursor-pointer hover:text-blue-400 text-slate-300"
      >
        {" @jma8774"}
      </span>
    </div>
  );
};

export default MadeWithLove;
