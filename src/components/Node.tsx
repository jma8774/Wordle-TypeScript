import React from "react";

const statusColor: Record<string, string> = {
  init: "text-white-500",
  success: "text-green-500",
  almost: "text-orange-500",
  never: "text-zinc-500",
};

interface CharColor {
  ch: string;
  color: string;
}

interface Props {
  pair: CharColor;
  className?: string;
}

const areEqual = (prevProps: Props, nextProps: Props): boolean => {
  return (
    prevProps.pair.ch === nextProps.pair.ch &&
    prevProps.pair.color === nextProps.pair.color
  );
};

const Node = ({ className, pair }: Props) => {
  return (
    <span className={className}>
      <span className={`${statusColor[pair.color]}`}>{pair.ch}</span>
    </span>
  );
};

export default React.memo(Node, areEqual);
