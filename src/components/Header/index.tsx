import React from "react";
import classNames from "classnames";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  console.log("Log: render header");
  const containerClass = classNames(
    "text-center text-4xl sm:text-5xl font-extrabold",
    className
  );
  return (
    <div className={containerClass}>
      <div>Just Wordle</div>
    </div>
  );
};

export default React.memo(Header);
