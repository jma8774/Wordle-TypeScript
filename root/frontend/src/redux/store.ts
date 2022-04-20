import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { gameSlice } from "./features/game/gameSlice";
import { guessesSlice } from "./features/guesses/guessesSlice";
import { keyboardSlice } from "./features/keyboard/keyboardSlice";
import {
  initialState as settingInitState,
  settingSlice,
} from "./features/setting/settingSlice";
import { localStorageSlice } from "./features/localStorage/localStorageSlice";
import {
  loadIsFirstVisit,
  loadLocalStats,
  loadShowDebug,
  saveShowDebug,
  saveStatsToLocalStorage,
} from "./utils/localStorageHelper";

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
    localStorage: loadLocalStats(),
  },
});

// Update my local storage
store.subscribe(() => {
  saveStatsToLocalStorage(store);
  saveShowDebug(store);
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatchState = typeof store.dispatch;
export type AppThunkAction = ThunkAction<void, RootState, unknown, AnyAction>;
export default store;
