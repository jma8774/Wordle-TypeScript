import { useEffect } from "react";

const useLog = <T extends any>(name: string, data: T) => {
  useEffect(() => {
    console.log(name, data);
  }, [name, data]);
};

export default useLog;
