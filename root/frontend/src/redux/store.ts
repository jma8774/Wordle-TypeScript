import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { gameSlice } from "./features/game/gameSlice";
import { guessesSlice } from "./features/guesses/guessesSlice";
import { keyboardSlice } from "./features/keyboard/keyboardSlice";
import {
  initialState as settingInitState,
  settingSlice,
} from "./features/setting/settingSlice";
import {
  localStorageSlice,
  LocalStorageState,
  initialState as localStorageInitState,
} from "./features/localStorage/localStorageSlice";

const loadIsFirstVisit = (): boolean => {
  try {
    const key = "first-visit";
    const isFirstVisit = localStorage.getItem(key) || "true";
    if (isFirstVisit === "true") {
      localStorage.setItem(key, "false");
      return true;
    }
    return false;
  } catch (e) {
    console.log(e);
    return true;
  }
};

const localStats = (): LocalStorageState => {
  try {
    const persistedStats = localStorage.getItem("stats");
    if (persistedStats) return JSON.parse(persistedStats);

    localStorage.setItem("don't change it 😔", "");
    localStorage.setItem("stats", JSON.stringify(localStorageInitState));
    return localStorageInitState;
  } catch (e) {
    console.log(e);
    return localStorageInitState;
  }
};

const saveStatsToLocalStorage = (): void => {
  try {
    const reduxStatState = store.getState().localStorage;
    localStorage.setItem("stats", JSON.stringify(reduxStatState));
  } catch (e) {
    console.log(e);
  }
};

const loadShowDebug = (): boolean => {
  try {
    const showDebug = localStorage.getItem("show-debug");
    if (showDebug) return JSON.parse(showDebug);

    localStorage.setItem("show-debug", "false");
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const saveShowDebug = (): void => {
  try {
    const showDebug = store.getState().setting.showDebug;
    localStorage.setItem("show-debug", JSON.stringify(showDebug));
  } catch (e) {
    console.log(e);
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
  preloadedState: {
    setting: {
      ...settingInitState,
      showHelp: loadIsFirstVisit(),
      showDebug: loadShowDebug(),
    },
    localStorage: localStats(),
  },
});

// Update my local storage
store.subscribe(() => {
  saveStatsToLocalStorage();
  saveShowDebug();
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatchState = typeof store.dispatch;
export type AppThunkAction = ThunkAction<void, RootState, unknown, AnyAction>;
export default store;
