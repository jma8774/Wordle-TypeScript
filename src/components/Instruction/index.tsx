import React from "react";

interface Props {
  closeInstruction: () => void;
}

const Instuction = ({ closeInstruction }: Props) => {
  return (
    <div
      onClick={closeInstruction}
      className="absolute w-64 h-64 top-10 bg-slate-700 z-10"
    >
      click to close
    </div>
  );
};

export default React.memo(Instuction);
