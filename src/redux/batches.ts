import { batch } from "react-redux";
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
  showErrorSubmit,
  showResetStats,
  showRestart,
} from "./features/setting/settingSlice";
import {
  incrementPlayed,
  handleWin,
  resetStreak,
  resetStats,
} from "./features/localStorage/localStorageSlice";
import store from "./store";

interface CharColor {
  id: number;
  ch: string;
  color: string;
}
type Status = "ongoing" | "lose" | "win";

// Returns random integer from [a, b]
const randomInt = (start: number, end: number): number => {
  return start + Math.floor(Math.random() * (end - start + 1));
};

const newGame = (answers: string[], status: Status): void => {
  batch(() => {
    if (status === "ongoing") store.dispatch(resetStreak());
    // Reset everything
    store.dispatch(resetGame());
    store.dispatch(resetGuesses());
    store.dispatch(resetKeyboard());
    // Get new word
    const index = randomInt(0, answers.length);
    store.dispatch(updateWordle(answers[index]));
    store.dispatch(showRestart());
  });
};

const submitChar = (status: Status, ch: string): void => {
  if (status === "ongoing") store.dispatch(handleChar(ch));
};

const submitBackspace = (status: Status): void => {
  if (status === "ongoing") store.dispatch(handleBackspace());
};

const submitWord = (
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
      if (row === 0) store.dispatch(incrementPlayed());
      store.dispatch(handleSubmit(wordle));
      store.dispatch(keyboardSubmit({ wordle, curGuess }));
      if (curGuess === wordle) {
        store.dispatch(changeStatus("win"));
        store.dispatch(handleWin(row + 1));
      } else if (row === MAX_GUESSES - 1) {
        store.dispatch(changeStatus("lose"));
        store.dispatch(resetStreak());
      }
    } else {
      store.dispatch(showErrorSubmit());
    }
  });
};

const handleHint = (wordle: string): void => {
  const offset = "#".repeat(WORDLE_LEN);
  store.dispatch(
    keyboardSubmit({ wordle: offset + wordle, curGuess: wordle + offset })
  );
  store.dispatch(openHint());
};

const batchResetStats = (): void => {
  batch(() => {
    store.dispatch(resetStats());
    store.dispatch(showResetStats());
  });
};

export {
  newGame,
  submitChar,
  submitBackspace,
  submitWord,
  handleHint,
  batchResetStats,
};
