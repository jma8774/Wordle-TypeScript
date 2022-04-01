import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { MAX_GUESSES, WORDLE_LEN } from "../../../constants";

// Returns a 2d array of our initial history array for our game
const initGuesses = (): CharColor[][] => {
  let history: CharColor[][] = [];
  for (let i = 0; i < MAX_GUESSES; i++) {
    history.push([]);
    for (let j = 0; j < WORDLE_LEN; j++) {
      history[i].push({ id: i * WORDLE_LEN + j, ch: " ", color: "init" });
    }
  }
  return history;
};

interface CharColor {
  id: number;
  ch: string;
  color: string;
}

// Define a type for the slice state
interface GuessesState {
  row: number;
  col: number;
  guesses: CharColor[][];
}

// Define the initial state using that type
const initialState: GuessesState = {
  row: 0,
  col: 0,
  guesses: initGuesses(),
};

export const guessesSlice = createSlice({
  name: "guesses",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    resetGuesses: (state) => {
      state.row = 0;
      state.col = 0;
      state.guesses = initGuesses();
    },
    handleBackspace: (state) => {
      if (state.row >= MAX_GUESSES || state.col === 0) return;
      state.guesses[state.row][state.col - 1].ch = " ";
      state.col = Math.max(0, state.col - 1);
    },
    handleChar: (state, action: PayloadAction<string>) => {
      if (state.row >= MAX_GUESSES || state.col === WORDLE_LEN) return;
      state.guesses[state.row][state.col].ch = action.payload;
      state.col = Math.min(WORDLE_LEN, state.col + 1);
    },
    handleSubmit: (state, action: PayloadAction<string>) => {
      const wordle = action.payload;
      const curWord = state.guesses[state.row].map((x) => x.ch).join("");
      // Iterate through each character of the guess word
      for (let i = 0; i < curWord.length; i++) {
        const ch: string = curWord[i];
        if (ch === wordle[i]) {
          // Character at index i of guess is same as character of wordle
          state.guesses[state.row][i].color = "success";
        } else if (wordle.includes(ch)) {
          // Otherwise, check if guess char is a char in the wordle
          state.guesses[state.row][i].color = "almost";
        } else {
          // Otherwise, mark the character as 'never' possible
          state.guesses[state.row][i].color = "never";
        }
      }
      state.row += 1;
      state.col = 0;
    },
  },
});

export const { resetGuesses, handleBackspace, handleChar, handleSubmit } =
  guessesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectValue = (state: RootState) => state.guesses.guesses;
export const selectRow = (state: RootState) => state.guesses.row;
export const selectCol = (state: RootState) => state.guesses.col;

export default guessesSlice.reducer;
