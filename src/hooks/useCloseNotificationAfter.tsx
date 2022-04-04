import { useEffect } from "react";

const useCloseNotificationAfter = (
  open: boolean,
  cb: () => void,
  ms: number
) => {
  useEffect(() => {
    if (!open) return;
    const timeId = setTimeout(cb, ms);
    return () => {
      clearTimeout(timeId);
    };
  }, [open, ms, cb]);
};

export default useCloseNotificationAfter;
