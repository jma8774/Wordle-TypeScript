import { configureStore } from "@reduxjs/toolkit";
import { gameSlice } from "./features/game/gameSlice";
import { guessesSlice } from "./features/guesses/guessesSlice";
import { keyboardSlice } from "./features/keyboard/keyboardSlice";
import { settingSlice } from "./features/setting/settingSlice";

const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
    guesses: guessesSlice.reducer,
    keyboard: keyboardSlice.reducer,
    setting: settingSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatchState = typeof store.dispatch;

export default store;
