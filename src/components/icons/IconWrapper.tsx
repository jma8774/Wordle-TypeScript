import React from "react";
import { IconProps } from "../../types/propTypes";

/*
 General purpose component for SVG icons:
  <IconWrapper onClick={onClick} className={className}>
    <path ... />
  </IconWrapper> 
*/
const IconWrapper = ({
  children,
  altText,
  onClick,
  className = "",
}: IconProps) => {
  return (
    <span onClick={onClick} className="hover:cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} inline-block`}
        fill="currentColor"
        strokeWidth="1"
        viewBox="0 0 20 20"
      >
        <title>{altText}</title>
        {children}
      </svg>
    </span>
  );
};

export default IconWrapper;
