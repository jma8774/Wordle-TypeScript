import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface Distribution {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
}

// Define a type for the slice state
export interface LocalStorageState {
  gamesPlayed: number;
  gamesWon: number;
  longestStreak: number;
  currentStreak: number;
  distribution: Distribution;
}

// Define the initial state using that type
export const initialState: LocalStorageState = {
  gamesPlayed: 0,
  gamesWon: 0,
  longestStreak: 0,
  currentStreak: 0,
  distribution: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  },
};

export const localStorageSlice = createSlice({
  name: "localStorage",
  initialState,
  reducers: {
    incrementPlayed: (state) => {
      state.gamesPlayed += 1;
    },
    handleWin: (state, action: PayloadAction<number>) => {
      state.gamesWon += 1;
      state.gamesPlayed = Math.max(state.gamesPlayed, state.gamesWon);
      const row = action.payload as keyof Distribution;
      state.distribution[row] += 1;
      state.currentStreak += 1;
      state.longestStreak = Math.max(state.longestStreak, state.currentStreak);
    },
    resetStreak: (state) => {
      state.currentStreak = 0;
    },
    resetStats: () => {
      return initialState;
    },
  },
});

export const { incrementPlayed, handleWin, resetStreak, resetStats } =
  localStorageSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectGamesWon = (state: RootState) => state.localStorage.gamesWon;

export default localStorageSlice.reducer;
