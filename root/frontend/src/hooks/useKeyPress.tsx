import { useEffect } from "react";
import { Callback } from "../types/types";

type EventCode = string;
type Operations = Record<EventCode, Callback>;

type Checks = boolean[];

const useKeyPress = (operations: Operations, checks?: Checks) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent): void => {
      // If any check is false, don't listen to keypresses
      if (checks?.some((x) => !x)) return;

      // Perform operation if keycode is a key in operations
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
