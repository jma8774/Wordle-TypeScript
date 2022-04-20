import {
  LocalStorageState,
  initialState as localStorageInitState,
} from "../features/localStorage/localStorageSlice";
import { EnhancedStore } from "@reduxjs/toolkit";

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

const loadLocalStats = (): LocalStorageState => {
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

const saveStatsToLocalStorage = (store: EnhancedStore): void => {
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

const saveShowDebug = (store: EnhancedStore): void => {
  try {
    const showDebug = store.getState().setting.showDebug;
    localStorage.setItem("show-debug", JSON.stringify(showDebug));
  } catch (e) {
    console.log(e);
  }
};

export {
  loadIsFirstVisit,
  loadShowDebug,
  loadLocalStats,
  saveStatsToLocalStorage,
  saveShowDebug,
};
