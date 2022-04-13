import { useEffect, useState } from "react";

interface WindowState {
  width: number;
  height: number;
}

// Hook to get the most up to date window width and height
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
