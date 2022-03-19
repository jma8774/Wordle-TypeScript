import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const ButtonWrapper = ({ children, onClick, className }: ButtonProps) => {
  return (
    <span onClick={onClick} className={`${className} hover:cursor-pointer`}>
      {children}
    </span>
  );
};

export default ButtonWrapper;
