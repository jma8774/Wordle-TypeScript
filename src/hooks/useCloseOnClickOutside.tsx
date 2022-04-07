import { RefObject, useEffect } from "react";

// Pass a ref and when the user clicks outside of the ref, the ref element will perform the handler (in thie case we should close it)
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
