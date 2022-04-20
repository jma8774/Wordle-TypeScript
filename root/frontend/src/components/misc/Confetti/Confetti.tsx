import React, { useEffect, useState } from "react";
import ConfettiBody from "react-confetti";
import useWindowSize from "../../../hooks/useWindowSize";
import { useAppSelector } from "../../../redux/hooks";

const Confetti = () => {
  const status = useAppSelector((state) => state.game.status);
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
