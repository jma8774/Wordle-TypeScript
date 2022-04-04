import { batch } from "react-redux";
import { AppDispatchState } from "./store";
import {
  resetGame,
  updateWordle,
  changeStatus,
  openHint,
} from "./features/game/gameSlice";
import {
  resetGuesses,
  handleChar,
  handleBackspace,
  handleSubmit,
} from "./features/guesses/guessesSlice";
import {
  resetKeyboard,
  keyboardSubmit,
} from "./features/keyboard/keyboardSlice";
import { MAX_GUESSES, WORDLE_LEN } from "../constants";
import {
  closeErrorSubmit,
  showErrorSubmit,
  showRestart,
} from "./features/setting/settingSlice";

interface CharColor {
  id: number;
  ch: string;
  color: string;
}

// Returns random integer from [a, b]
const randomInt = (start: number, end: number): number => {
  return start + Math.floor(Math.random() * (end - start + 1));
};

const newGame = (dispatch: AppDispatchState, answers: string[]): void => {
  batch(() => {
    // Reset everything
    dispatch(resetGame());
    dispatch(resetGuesses());
    dispatch(resetKeyboard());
    // Get new word
    const index = randomInt(0, answers.length);
    dispatch(updateWordle(answers[index]));
    dispatch(showRestart());
  });
};

const submitChar = (
  dispatch: AppDispatchState,
  status: "ongoing" | "lose" | "win",
  ch: string
): void => {
  if (status === "ongoing") dispatch(handleChar(ch));
};

const submitBackspace = (
  dispatch: AppDispatchState,
  status: "ongoing" | "lose" | "win"
): void => {
  if (status === "ongoing") dispatch(handleBackspace());
};

const submitWord = (
  dispatch: AppDispatchState,
  row: number,
  guesses: CharColor[][],
  words: Set<string>,
  wordle: string
): void => {
  batch(() => {
    if (row >= MAX_GUESSES) return;
    const curGuess = guesses[row].map((x) => x.ch).join("");
    // Update guesses and keyboard
    if (words.has(curGuess)) {
      dispatch(handleSubmit(wordle));
      dispatch(keyboardSubmit({ wordle, curGuess }));
      if (curGuess === wordle) dispatch(changeStatus("win"));
      else if (row === MAX_GUESSES - 1) dispatch(changeStatus("lose"));
    } else {
      dispatch(showErrorSubmit());
    }
  });
};

const handleHint = (dispatch: AppDispatchState, wordle: string): void => {
  const offset = "#".repeat(WORDLE_LEN);
  dispatch(
    keyboardSubmit({ wordle: offset + wordle, curGuess: wordle + offset })
  );
  dispatch(openHint());
};

export { newGame, submitChar, submitBackspace, submitWord, handleHint };
