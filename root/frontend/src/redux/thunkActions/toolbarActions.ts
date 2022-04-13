import {
  fetchDefinition,
  openHint,
  resetGame,
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
  preload: boolean = false,
  challengeWord: string = ""
): AppThunkAction => {
  return (dispatch, getState) => {
    const { status } = getState().game;
    const { row } = getState().guesses;
    const { showGameResult } = getState().setting;
    // Only do these when the website is not initially loading
    if (!preload) {
      if (status === "ongoing" && row > 0) dispatch(resetStreak());
      if (showGameResult) dispatch(closeGameResult());
      dispatch(showRestart());
    }
    // Get new word
    const index = randomInt(0, answers.length - 1);
    const newWord = challengeWord || answers[index];
    // Reset everything
    dispatch(resetGame(newWord));
    dispatch(fetchDefinition(newWord));
    dispatch(resetGuesses());
    dispatch(resetKeyboard());
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
