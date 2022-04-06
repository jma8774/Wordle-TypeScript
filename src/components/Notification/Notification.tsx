import React from "react";
import useCloseNotificationAfter from "../../hooks/useCloseNotificationAfter";
import { closeHint } from "../../redux/features/game/gameSlice";
import {
  closeErrorSubmit,
  closeResetStats,
  closeRestart,
} from "../../redux/features/setting/settingSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Error from "./Error";
import Success from "./Success";

interface Props {}

const Notification = (props: Props) => {
  const dispatch = useAppDispatch();
  const { restart, errorSubmit, resetStats } = useAppSelector(
    (state) => state.setting
  );
  const { hintGiven } = useAppSelector((state) => state.game);

  useCloseNotificationAfter(
    errorSubmit,
    () => dispatch(closeErrorSubmit()),
    2000
  );
  useCloseNotificationAfter(hintGiven, () => dispatch(closeHint()), 3000);
  useCloseNotificationAfter(restart, () => dispatch(closeRestart()), 2000);
  useCloseNotificationAfter(
    resetStats,
    () => dispatch(closeResetStats()),
    3000
  );

  return (
    <div className="absolute flex flex-col gap-2 top-0 right-0 w-fit z-10 p-4 overflow-x-hidden">
      {errorSubmit && (
        <Error
          title="Word Error"
          body="That is not a valid word!"
          onClick={() => dispatch(closeErrorSubmit())}
        />
      )}
      {hintGiven && (
        <Success
          title="Hint Updated"
          body="Keyboard has been marked yellow."
          onClick={() => dispatch(closeHint())}
        />
      )}
      {restart && (
        <Success
          title="Game Restarted"
          body="A new word has been selected!"
          onClick={() => dispatch(closeRestart())}
        />
      )}
      {resetStats && (
        <Success
          title="Stats Reset"
          body="Enjoy your fresh start!"
          onClick={() => dispatch(closeResetStats())}
        />
      )}
    </div>
  );
};

export default React.memo(Notification);
