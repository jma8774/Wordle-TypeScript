import { useEffect } from "react";
import { selectModals } from "../redux/features/setting/settingSlice";
import { useAppSelector } from "../redux/hooks";

type EventCode = string;
type Callback = () => void;
type Operations = Record<EventCode, Callback>;

const useKeyPress = (operations: Operations) => {
  const { showHelp, showStat, showChallenge, showGameResult } =
    useAppSelector(selectModals);
  const modalOpen = showHelp || showStat || showGameResult || showChallenge;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent): void => {
      if (modalOpen) return;

      // Ignore default when these keys are pressed for our application
      if (operations.hasOwnProperty(e.code)) {
        e.preventDefault();
        operations[e.code]();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [modalOpen, operations]);
};

export default useKeyPress;
