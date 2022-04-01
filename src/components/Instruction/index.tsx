import React from "react";

interface Props {
  closeInstruction: () => void;
}

const Instuction = ({ closeInstruction }: Props) => {
  return (
    <div
      onClick={closeInstruction}
      className="absolute bg-slate-700 z-10 rounded"
    >
      click to close
    </div>
  );
};

export default React.memo(Instuction);
