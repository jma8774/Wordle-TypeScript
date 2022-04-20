import React from "react";
import useCloseNotificationAfter from "../../../hooks/useCloseNotificationAfter";
import { closeHint } from "../../../redux/features/game/gameSlice";
import {
  closeErrorSubmit,
  closeResetStats,
  closeRestart,
  closeWordleLinkCopied,
  selectNotifications,
} from "../../../redux/features/setting/settingSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Error from "./Error";
import Success from "./Success";

interface Props {}

const Notification = (props: Props) => {
  const dispatch = useAppDispatch();
  const {
    notifErrorSubmit,
    notifResetStats,
    notifRestart,
    notifWordleLinkCopied,
  } = useAppSelector(selectNotifications);
  const notifHintGiven = useAppSelector((state) => state.game.hintGiven);

  useCloseNotificationAfter(
    notifErrorSubmit,
    () => dispatch(closeErrorSubmit()),
    2000
  );
  useCloseNotificationAfter(notifHintGiven, () => dispatch(closeHint()), 3000);
  useCloseNotificationAfter(notifRestart, () => dispatch(closeRestart()), 2000);
  useCloseNotificationAfter(
    notifResetStats,
    () => dispatch(closeResetStats()),
    3000
  );
  useCloseNotificationAfter(
    notifWordleLinkCopied,
    () => dispatch(closeWordleLinkCopied()),
    3000
  );

  return (
    <div className="absolute flex flex-col gap-2 top-0 right-0 w-fit z-10 p-4 overflow-x-hidden">
      {notifErrorSubmit && (
        <Error
          title="Word Error"
          body="That is not a valid word!"
          onClick={() => dispatch(closeErrorSubmit())}
        />
      )}
      {notifHintGiven && (
        <Success
          title="Hint Updated"
          body="Keyboard has been marked yellow."
          onClick={() => dispatch(closeHint())}
        />
      )}
      {notifRestart && (
        <Success
          title="Game Restarted"
          body="A new word has been selected!"
          onClick={() => dispatch(closeRestart())}
        />
      )}
      {notifResetStats && (
        <Success
          title="Stats Reset"
          body="Enjoy your fresh start!"
          onClick={() => dispatch(closeResetStats())}
        />
      )}
      {notifWordleLinkCopied && (
        <Success
          title="Link Copied"
          body="Share the link to a friend!"
          onClick={() => dispatch(closeWordleLinkCopied())}
        />
      )}
    </div>
  );
};

export default React.memo(Notification);
