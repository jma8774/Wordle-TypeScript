import React from "react";
import useCloseNotificationAfter from "../../hooks/useCloseNotificationAfter";
import { closeHint } from "../../redux/features/game/gameSlice";
import {
  closeErrorSubmit,
  closeRestart,
} from "../../redux/features/setting/settingSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Error from "./Error";
import Success from "./Success";

interface Props {}

const Notification = (props: Props) => {
  const dispatch = useAppDispatch();
  const { restart, errorSubmit } = useAppSelector((state) => state.setting);
  const { hintGiven } = useAppSelector((state) => state.game);

  useCloseNotificationAfter(
    errorSubmit,
    () => dispatch(closeErrorSubmit()),
    2000
  );
  useCloseNotificationAfter(hintGiven, () => dispatch(closeHint()), 3000);
  useCloseNotificationAfter(restart, () => dispatch(closeRestart()), 2000);

  return (
    <div className="absolute flex flex-col gap-2 top-0 right-0 w-fit z-10 p-4 overflow-x-hidden">
      {errorSubmit && (
        <Error title="Word Error" body="That is not a valid word!" />
      )}
      {hintGiven && (
        <Success title="Hint Updated" body="Keyboard has been marked yellow." />
      )}
      {restart && (
        <Success title="Game Restarted" body="A new word has been selected!" />
      )}
    </div>
  );
};

export default React.memo(Notification);
