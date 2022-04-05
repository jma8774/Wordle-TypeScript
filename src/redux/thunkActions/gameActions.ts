import { MAX_GUESSES } from "../../constants";
import { changeStatus } from "../features/game/gameSlice";
import {
  handleBackspace,
  handleChar,
  handleSubmit,
} from "../features/guesses/guessesSlice";
import { keyboardSubmit } from "../features/keyboard/keyboardSlice";
import {
  handleWin,
  incrementPlayed,
  resetStreak,
} from "../features/localStorage/localStorageSlice";
import { showErrorSubmit } from "../features/setting/settingSlice";
import { AppThunkAction } from "../store";

const submitChar = (ch: string): AppThunkAction => {
  return (dispatch, getState) => {
    const { status } = getState().game;
    if (status === "ongoing") dispatch(handleChar(ch));
  };
};

const submitBackspace = (): AppThunkAction => {
  return (dispatch, getState) => {
    const { status } = getState().game;
    if (status === "ongoing") dispatch(handleBackspace());
  };
};

const submitWord = (words: Set<string>): AppThunkAction => {
  return (dispatch, getState) => {
    const { wordle, status } = getState().game;
    const { row, guesses } = getState().guesses;
    if (status !== "ongoing" || row >= MAX_GUESSES) return;

    const curGuess = guesses[row].map((x) => x.ch).join("");
    // Update guesses and keyboard
    if (words.has(curGuess)) {
      if (row === 0) dispatch(incrementPlayed());
      dispatch(handleSubmit(wordle));
      dispatch(keyboardSubmit({ wordle, curGuess }));
      if (curGuess === wordle) {
        dispatch(changeStatus("win"));
        dispatch(handleWin(row + 1));
      } else if (row === MAX_GUESSES - 1) {
        dispatch(changeStatus("lose"));
        dispatch(resetStreak());
      }
    } else {
      dispatch(showErrorSubmit());
    }
  };
};

export { submitBackspace, submitChar, submitWord };
