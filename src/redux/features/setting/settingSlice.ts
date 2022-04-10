import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// Some of these states might not be necessary for Redux but since I am learning it, I might as well put all of them in here for organiziation
export interface SettingState {
  theme: "dark" | "light";
  showDebug: boolean;
  // Modals
  showHelp: boolean;
  showStat: boolean;
  showChallenge: boolean;
  showGameResult: boolean;
  // Notifications
  restart: boolean;
  resetStats: boolean;
  errorSubmit: boolean;
  wordleLinkCopied: boolean;
}

export const initialState: SettingState = {
  theme: "dark",
  showDebug: false,
  // Modals
  showHelp: false,
  showStat: false,
  showChallenge: false,
  showGameResult: false,
  // Notifications
  restart: false,
  resetStats: false,
  errorSubmit: false,
  wordleLinkCopied: false,
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    toggleShowDebug: (state) => {
      state.showDebug = !state.showDebug;
    },
    // Modals
    openHelp: (state) => {
      state.showHelp = true;
    },
    openStat: (state) => {
      state.showStat = true;
    },
    openChallenge: (state) => {
      state.showChallenge = true;
    },
    openGameResult: (state) => {
      state.showGameResult = true;
    },
    closeGameResult: (state) => {
      state.showGameResult = false;
    },
    resetModals: (state) => {
      state.showHelp = false;
      state.showStat = false;
      state.showChallenge = false;
    },
    // Notifications
    showRestart: (state) => {
      state.restart = true;
    },
    closeRestart: (state) => {
      state.restart = false;
    },
    showResetStats: (state) => {
      state.resetStats = true;
    },
    closeResetStats: (state) => {
      state.resetStats = false;
    },
    showErrorSubmit: (state) => {
      state.errorSubmit = true;
    },
    closeErrorSubmit: (state) => {
      state.errorSubmit = false;
    },
    showWordleLinkCopied: (state) => {
      state.wordleLinkCopied = true;
    },
    closeWordleLinkCopied: (state) => {
      state.wordleLinkCopied = false;
    },
  },
});

export const {
  toggleTheme,
  toggleShowDebug,
  // Modals
  openHelp,
  openStat,
  openChallenge,
  openGameResult,
  closeGameResult,
  resetModals,
  // Notifications
  showErrorSubmit,
  closeErrorSubmit,
  showRestart,
  closeRestart,
  showResetStats,
  closeResetStats,
  showWordleLinkCopied,
  closeWordleLinkCopied,
} = settingSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTheme = (state: RootState) => state.setting.theme;

export default settingSlice.reducer;
