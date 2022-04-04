import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// Define a type for the slice state
export interface GameState {
  status: "ongoing" | "lose" | "win";
  wordle: string;
  hintGiven: boolean;
}

// Define the initial state using that type
const initialState: GameState = {
  status: "ongoing",
  wordle: "",
  hintGiven: false,
};

export const gameSlice = createSlice({
  name: "game",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    resetGame: (state) => {
      state.status = "ongoing";
      state.wordle = "";
      state.hintGiven = false;
    },
    updateWordle: (state, action: PayloadAction<string>) => {
      state.wordle = action.payload;
    },
    changeStatus: (
      state,
      action: PayloadAction<"ongoing" | "lose" | "win">
    ) => {
      state.status = action.payload;
    },
    openHint: (state) => {
      state.hintGiven = true;
    },
    closeHint: (state) => {
      state.hintGiven = false;
    },
  },
});

export const { resetGame, updateWordle, changeStatus, openHint, closeHint } =
  gameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectStatus = (state: RootState) => state.game.status;
export const selectWordle = (state: RootState) => state.game.wordle;

export default gameSlice.reducer;
