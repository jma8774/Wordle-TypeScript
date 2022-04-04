import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// Define a type for the slice state
export interface SettingState {
  theme: "dark" | "light";
  restart: boolean;
  showHelp: boolean;
  showStat: boolean;
  errorSubmit: boolean;
}

// Define the initial state using that type
const initialState: SettingState = {
  theme: "dark",
  restart: false,
  showHelp: false,
  showStat: false,
  errorSubmit: false,
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    showRestart: (state) => {
      state.restart = true;
    },
    closeRestart: (state) => {
      state.restart = false;
    },
    showHelp: (state) => {
      state.showHelp = true;
    },
    closeHelp: (state) => {
      state.showHelp = false;
    },
    showStat: (state) => {
      state.showStat = true;
    },
    closeStat: (state) => {
      state.showStat = false;
    },
    showErrorSubmit: (state) => {
      state.errorSubmit = true;
    },
    closeErrorSubmit: (state) => {
      state.errorSubmit = false;
    },
    resetModals: (state) => {
      state.showHelp = false;
      state.showStat = false;
    },
  },
});

export const {
  toggleTheme,
  showHelp,
  closeHelp,
  showStat,
  closeStat,
  showErrorSubmit,
  closeErrorSubmit,
  resetModals,
  showRestart,
  closeRestart,
} = settingSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTheme = (state: RootState) => state.setting.theme;

export default settingSlice.reducer;
