import React from "react";

interface IconProps {
  children: React.ReactNode;
  onClick?: () => void;
  altText?: string;
  className?: string;
}

/*
 General purpose component for SVG icons:
  <IconWrapper onClick={onClick} className={className}>
    <path ... />
  </IconWrapper> 
*/
const IconWrapper = ({
  children,
  onClick,
  altText,
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
