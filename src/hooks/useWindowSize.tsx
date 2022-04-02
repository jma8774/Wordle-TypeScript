import { useEffect, useState } from "react";

interface WindowState {
  width: number;
  height: number;
}
function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowState>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    handleResize();
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

export default useWindowSize;
