import {
  fetchDefinition,
  openHint,
  resetGame,
  updateStartTime,
  updateWordle,
} from "../features/game/gameSlice";
import { resetGuesses } from "../features/guesses/guessesSlice";
import {
  keyboardSubmit,
  resetKeyboard,
} from "../features/keyboard/keyboardSlice";
import {
  resetStats,
  resetStreak,
} from "../features/localStorage/localStorageSlice";
import { AppThunkAction } from "../store";
import {
  closeGameResult,
  showResetStats,
  showRestart,
} from "../features/setting/settingSlice";
import { WORDLE_LEN } from "../../utils/constants";
import { randomInt } from "../../utils/helper";

// Note: Thunk Actions are used to handle async logic and also to utilize multiple dispatches with just 1 render

const newGame = (
  answers: string[],
  preload: boolean = false
): AppThunkAction => {
  return (dispatch, getState) => {
    const { status } = getState().game;
    // Only do these when the website is not initially loading
    if (!preload) {
      // Reset streak if it is ongoing
      if (status === "ongoing") dispatch(resetStreak());
      dispatch(showRestart());
      dispatch(closeGameResult());
    }
    // Reset everything
    dispatch(resetGame());
    dispatch(resetGuesses());
    dispatch(resetKeyboard());
    // Get new word
    const index = randomInt(0, answers.length - 1);
    dispatch(updateWordle(answers[index]));
    dispatch(fetchDefinition(answers[index]));
    dispatch(updateStartTime());
  };
};

const handleHint = (): AppThunkAction => {
  return (dispatch, getState) => {
    const { wordle } = getState().game;
    const padding = "#".repeat(WORDLE_LEN);
    dispatch(
      keyboardSubmit({ wordle: padding + wordle, curGuess: wordle + padding })
    );
    dispatch(openHint());
  };
};

const handleResetStats = (): AppThunkAction => {
  return (dispatch, getState) => {
    dispatch(resetStats());
    dispatch(showResetStats());
  };
};

export { newGame, handleHint, handleResetStats };
