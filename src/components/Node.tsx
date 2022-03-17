import React from "react";

const statusColor: Record<string, string> = {
  init: "black",
  success: "green",
  almost: "orange",
  never: "grey",
};

interface CharColor {
  ch: string;
  color: string;
}

interface Props {
  pair: CharColor;
}

const areEqual = (prevProps: Props, nextProps: Props): boolean => {
  return (
    prevProps.pair.ch === nextProps.pair.ch &&
    prevProps.pair.color === nextProps.pair.color
  );
};

const Node = ({ pair }: Props) => {
  return <span style={{ color: statusColor[pair.color] }}>{pair.ch}</span>;
};

export default React.memo(Node, areEqual);
