import React from "react";

const ShareWordButton = ({ onClick }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <button onClick={onClick} className="border p-2">
      Share Word
    </button>
  );
};

export { ShareWordButton };
