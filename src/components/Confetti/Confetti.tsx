import React, { useEffect, useState } from "react";
import ConfettiBody from "react-confetti";
import useWindowSize from "../../hooks/useWindowSize";
import { Status } from "../../types/types";

interface Props {
  status: Status;
}

const Confetti = ({ status }: Props) => {
  const [show, setShow] = useState(false);
  const windowSize = useWindowSize();

  useEffect(() => {
    if (status !== "win") return;

    setShow(true);
    const timeId = setTimeout(() => {
      setShow(false);
    }, 5000);

    return () => {
      setShow(false);
      clearTimeout(timeId);
    };
  }, [status]);

  if (!show) {
    return null;
  }

  return (
    <ConfettiBody
      width={windowSize.width}
      height={windowSize.height - 1}
      tweenDuration={7500}
      recycle={false}
      run
    />
  );
};

export default React.memo(Confetti);
