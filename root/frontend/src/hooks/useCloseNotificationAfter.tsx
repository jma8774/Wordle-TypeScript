import { useEffect } from "react";
import { Callback } from "../types/types";

// Pass a callback to be executed after ms time, (setState to false)
const useCloseNotificationAfter = (
  open: boolean,
  callback: Callback,
  ms: number
) => {
  useEffect(() => {
    if (!open) return;
    const timeId = setTimeout(callback, ms);
    return () => {
      clearTimeout(timeId);
    };
  }, [open, ms, callback]);
};

export default useCloseNotificationAfter;
