import React from "react";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  console.log("Log: render header");
  return (
    <div
      className={`${className} text-center text-4xl sm:text-5xl font-extrabold`}
    >
      <div>Just Wordle</div>
    </div>
  );
};

export default React.memo(Header);
