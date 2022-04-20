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
  notifRestart: boolean;
  notifResetStats: boolean;
  notifErrorSubmit: boolean;
  notifWordleLinkCopied: boolean;
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
  notifRestart: false,
  notifResetStats: false,
  notifErrorSubmit: false,
  notifWordleLinkCopied: false,
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
      state.notifRestart = true;
    },
    closeRestart: (state) => {
      state.notifRestart = false;
    },
    showResetStats: (state) => {
      state.notifResetStats = true;
    },
    closeResetStats: (state) => {
      state.notifResetStats = false;
    },
    showErrorSubmit: (state) => {
      state.notifErrorSubmit = true;
    },
    closeErrorSubmit: (state) => {
      state.notifErrorSubmit = false;
    },
    showWordleLinkCopied: (state) => {
      state.notifWordleLinkCopied = true;
    },
    closeWordleLinkCopied: (state) => {
      state.notifWordleLinkCopied = false;
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
export const selectNotifications = (state: RootState) => {
  const {
    notifRestart,
    notifResetStats,
    notifErrorSubmit,
    notifWordleLinkCopied,
  } = state.setting;
  return {
    notifRestart,
    notifResetStats,
    notifErrorSubmit,
    notifWordleLinkCopied,
  };
};
export const selectModals = (state: RootState) => {
  const { showHelp, showStat, showChallenge, showGameResult } = state.setting;
  return {
    showHelp,
    showStat,
    showChallenge,
    showGameResult,
  };
};

export default settingSlice.reducer;
