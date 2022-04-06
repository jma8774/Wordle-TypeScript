import { useEffect, useState } from "react";

interface WindowState {
  width: number;
  height: number;
}
function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowState>({
    width: document.body.clientWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: document.body.clientWidth,
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
