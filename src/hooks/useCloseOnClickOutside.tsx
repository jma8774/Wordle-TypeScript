import { RefObject, useEffect } from "react";

// Purpose of this hook is to mimic normal arrays, this allows us to 'mutate' our state which we otherwise wouldn't be able to in React
const useCLoseOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: () => void
) => {
  useEffect(() => {
    const handleMouseClick = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler();
    };

    window.addEventListener("mousedown", handleMouseClick);
    window.addEventListener("touchstart", handleMouseClick);
    return () => {
      window.removeEventListener("mousedown", handleMouseClick);
      window.removeEventListener("touchstart", handleMouseClick);
    };
  }, [ref, handler]);
};

export default useCLoseOnClickOutside;
