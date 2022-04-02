import classNames from "classnames";
import React from "react";

interface Props {
  pt?: number;
  pb?: number;
  width?: number;
  color?: number;
}

const Divider = ({ pt, pb, width, color }: Props) => {
  const dividerClass = classNames(
    "border-t-2 rounded-md",
    `border-${color || "slate-600"}`,
    `pt-${pt || "2"}`,
    `pb-${pb || "3"}`
  );
  return <div className={dividerClass} />;
};

export default React.memo(Divider);
