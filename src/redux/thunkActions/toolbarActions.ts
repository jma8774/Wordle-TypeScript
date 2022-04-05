import { openHint, resetGame, updateWordle } from "../features/game/gameSlice";
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
import { showResetStats, showRestart } from "../features/setting/settingSlice";
import { WORDLE_LEN } from "../../utils/constants";
import { randomInt } from "../../utils/helper";

const newGame = (answers: string[]): AppThunkAction => {
  return (dispatch, getState) => {
    const { status } = getState().game;
    if (status === "ongoing") dispatch(resetStreak());
    // Reset everything
    dispatch(resetGame());
    dispatch(resetGuesses());
    dispatch(resetKeyboard());
    // Get new word
    const index = randomInt(0, answers.length);
    dispatch(updateWordle(answers[index]));
    dispatch(showRestart());
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
