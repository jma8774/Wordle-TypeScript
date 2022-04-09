import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../../../types/types";
import type { RootState } from "../../store";

// Define a type for the slice state
export interface GameState {
  status: Status;
  wordle: string;
  definition: string;
  hintGiven: boolean;
  timeStart: number;
  timeEnd: number;
}

// Define the initial state using that type
export const initialState: GameState = {
  status: "ongoing",
  definition: "",
  wordle: "",
  hintGiven: false,
  timeStart: new Date().getTime(),
  timeEnd: new Date().getTime(),
};

export const gameSlice = createSlice({
  name: "game",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    resetGame: () => {
      return initialState;
    },
    updateWordle: (state, action: PayloadAction<string>) => {
      state.wordle = action.payload;
    },
    updateDefinition: (state, action: PayloadAction<string>) => {
      state.definition = action.payload;
    },
    updateStartTime: (state) => {
      state.timeStart = new Date().getTime();
    },
    updateEndTime: (state) => {
      state.timeEnd = new Date().getTime();
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
  extraReducers(builder) {
    builder.addCase(fetchDefinition.pending, (state, action) => {
      state.definition = "Definition loading stalled...";
    });
    builder.addCase(fetchDefinition.fulfilled, (state, action) => {
      state.definition = action.payload;
    });
    builder.addCase(fetchDefinition.rejected, (state, action) => {
      state.definition =
        "Sorry, definition not found on the API that I am using 😞";
    });
  },
});

export const fetchDefinition = createAsyncThunk(
  "users/fetchDefinition",
  async (wordle: string) => {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${wordle}`
    );
    const data = await response.json();
    return data?.[0].meanings[0].definitions[0].definition;
  }
);

export const {
  resetGame,
  updateWordle,
  updateDefinition,
  updateStartTime,
  updateEndTime,
  changeStatus,
  openHint,
  closeHint,
} = gameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectStatus = (state: RootState) => state.game.status;
export const selectWordle = (state: RootState) => state.game.wordle;

export default gameSlice.reducer;
