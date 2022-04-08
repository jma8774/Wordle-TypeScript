const SVGWrapper = ({ children }: { children: JSX.Element }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 stroke-white p-1 bg-blue-600 rounded border-b-2 border-blue-800"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      {children}
    </svg>
  );
};

const PlayedIcon = () => {
  return (
    <SVGWrapper>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
      />
    </SVGWrapper>
  );
};

const WonIcon = () => {
  return (
    <SVGWrapper>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </SVGWrapper>
  );
};

const StreakIcon = () => {
  return (
    <SVGWrapper>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </SVGWrapper>
  );
};

const CurrentStreakIcon = () => {
  return (
    <SVGWrapper>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    </SVGWrapper>
  );
};

export { PlayedIcon, WonIcon, StreakIcon, CurrentStreakIcon };
