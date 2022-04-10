import { IconProps } from "../../types/propTypes";
import IconWrapper from "./IconWrapper";

const SearchIcon = ({ className, altText, onClick }: IconProps) => {
  return (
    <IconWrapper onClick={onClick} altText={altText} className={className}>
      <path
        fillRule="evenodd"
        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
        clipRule="evenodd"
      />
    </IconWrapper>
  );
};

export default SearchIcon;
