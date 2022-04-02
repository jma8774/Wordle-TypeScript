import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// Define a type for the slice state
export interface SettingState {
  theme: "dark" | "light";
  showHelp: boolean;
  showStat: boolean;
}

// Define the initial state using that type
const initialState: SettingState = {
  theme: "dark",
  showHelp: false,
  showStat: false,
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
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
  resetModals,
} = settingSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTheme = (state: RootState) => state.setting.theme;

export default settingSlice.reducer;
