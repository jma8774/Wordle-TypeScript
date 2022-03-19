import React from "react";

interface IconProps {
  children: React.ReactNode;
  className?: string;
}

const IconWrapper = ({ children, className }: IconProps) => {
  return (
    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} inline-block`}
        fill="currentColor"
        strokeWidth="1"
        viewBox="0 0 24 24"
      >
        {children}
      </svg>
    </span>
  );
};

export default IconWrapper;
