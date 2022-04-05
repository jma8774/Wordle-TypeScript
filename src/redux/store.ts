import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { gameSlice } from "./features/game/gameSlice";
import { guessesSlice } from "./features/guesses/guessesSlice";
import { keyboardSlice } from "./features/keyboard/keyboardSlice";
import { settingSlice } from "./features/setting/settingSlice";
import { localStorageSlice } from "./features/localStorage/localStorageSlice";
import {
  LocalStorageState,
  initialState as localStorageInitState,
} from "./features/localStorage/localStorageSlice";

const getStatsFromLocalStorage = (): LocalStorageState => {
  try {
    const persistedStats = localStorage.getItem("stats");
    if (persistedStats) return JSON.parse(persistedStats);

    localStorage.setItem("don't change it 😔", "");
    localStorage.setItem("stats", JSON.stringify(localStorageInitState));
    return localStorageInitState;
  } catch (e) {
    console.log(e);
    localStorage.setItem("stats", JSON.stringify(localStorageInitState));
    return localStorageInitState;
  }
};

const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
    guesses: guessesSlice.reducer,
    keyboard: keyboardSlice.reducer,
    setting: settingSlice.reducer,
    localStorage: localStorageSlice.reducer,
  },
  preloadedState: { localStorage: getStatsFromLocalStorage() },
});

// Update my local storage
store.subscribe(() => {
  localStorage.setItem("stats", JSON.stringify(store.getState().localStorage));
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatchState = typeof store.dispatch;
export type AppThunkAction = ThunkAction<void, RootState, unknown, AnyAction>;
export default store;
