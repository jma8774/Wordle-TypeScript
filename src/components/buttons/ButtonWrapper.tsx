import React from "react";

interface ButtonIcons {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const ButtonWrapper = ({ children, onClick, className }: ButtonIcons) => {
  return (
    <span onClick={onClick} className={`${className} hover:cursor-pointer`}>
      {children}
    </span>
  );
};

export default ButtonWrapper;
