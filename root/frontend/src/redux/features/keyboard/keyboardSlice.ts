import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlphabetColor } from "../../../types/types";
import type { RootState } from "../../store";

// Define a type for the slice state
export interface KeyboardState {
  keyboard: AlphabetColor;
}

export const initAlphabet = (): AlphabetColor => {
  let alphabet: AlphabetColor = {};
  const start = "a".charCodeAt(0);
  for (let i = start; i < start + 26; i++) {
    alphabet[String.fromCharCode(i)] = "init";
  }
  return alphabet;
};

// Define the initial state using that type
const initialState: KeyboardState = {
  keyboard: initAlphabet(),
};

export const keyboardSlice = createSlice({
  name: "keyboard",
  initialState,
  reducers: {
    resetKeyboard: (state) => {
      state.keyboard = initAlphabet();
    },
    keyboardSubmit: (
      state,
      action: PayloadAction<{ wordle: string; curGuess: string }>
    ) => {
      const { wordle, curGuess } = action.payload;
      for (let i = 0; i < curGuess.length; i++) {
        const ch = curGuess[i];
        if (!state.keyboard?.[ch]) continue;
        if (ch === wordle[i]) {
          state.keyboard[ch] = "success";
        } else if (state.keyboard[ch] !== "success") {
          state.keyboard[ch] = wordle.includes(ch) ? "almost" : "never";
        }
      }
    },
  },
});

export const { resetKeyboard, keyboardSubmit } = keyboardSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectKeyboard = (state: RootState) => state.keyboard.keyboard;

export default keyboardSlice.reducer;
