import { useEffect } from "react";
import { Callback } from "../types/types";

type EventCode = string;
type Operations = Record<EventCode, Callback>;

type Checks = boolean[];

const useKeyPress = (operations: Operations, checks?: Checks) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent): void => {
      if (checks?.some((x) => x === false)) return;

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
  }, [operations, checks]);
};

export default useKeyPress;
