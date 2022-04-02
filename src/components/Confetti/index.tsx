import React, { useEffect, useState } from "react";
import ConfettiBody from "react-confetti";
import useWindowSize from "../../hooks/useWindowSize";

interface Props {
  status: "ongoing" | "lose" | "win";
}

const Confetti = ({ status }: Props) => {
  const [show, setShow] = useState(false);
  const windowSize = useWindowSize();

  useEffect(() => {
    if (status !== "win") return;

    setShow(true);
    const timeId = setTimeout(() => {
      // After 3.5 seconds set the show value to false
      setShow(false);
    }, 3500);

    return () => {
      clearTimeout(timeId);
    };
  }, [status]);

  if (!show) {
    return null;
  }

  return (
    <ConfettiBody
      width={windowSize.width - 1}
      height={windowSize.height - 1}
      tweenDuration={7500}
      recycle={false}
      run
    />
  );
};

export default React.memo(Confetti);
