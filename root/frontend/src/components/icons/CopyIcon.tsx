import { IconProps } from "../../types/propTypes";
import IconWrapper from "./IconWrapper";

const CopyIcon = ({ className, altText, onClick }: IconProps) => {
  return (
    <IconWrapper onClick={onClick} altText={altText} className={className}>
      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
    </IconWrapper>
  );
};

export default CopyIcon;
