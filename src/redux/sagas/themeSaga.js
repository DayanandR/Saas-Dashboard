import { call, put, takeEvery, takeLatest, select } from "redux-saga/effects";
import {
  setThemeAsync,
  setThemeAsyncSuccess,
  setThemeAsyncFailure,
  initializeTheme,
  initializeThemeSuccess,
  initializeThemeFailure,
  toggleTheme,
  selectThemeMode,
} from "../slices/themeSlice";

const THEME_STORAGE_KEY = "app-theme-mode";
const THEME_STORAGE_VERSION = "1.0";

const themeStorageHelpers = {
  save: (theme) => {
    try {
      const themeData = {
        mode: theme,
        version: THEME_STORAGE_VERSION,
        timestamp: Date.now(),
      };
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(themeData));
      return true;
    } catch (error) {
      console.error("Failed to save theme to localStorage:", error);
      return false;
    }
  },
  load: () => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (!stored) return null;
      const themeData = JSON.parse(stored);
      if (themeData.version !== THEME_STORAGE_VERSION) {
        localStorage.removeItem(THEME_STORAGE_KEY);
        return null;
      }
      return themeData.mode;
    } catch (error) {
      console.error("Failed to load theme from localStorage:", error);
      localStorage.removeItem(THEME_STORAGE_KEY);
      return null;
    }
  },
  remove: () => {
    try {
      localStorage.removeItem(THEME_STORAGE_KEY);
      return true;
    } catch (error) {
      console.error("Failed to remove theme from localStorage:", error);
      return false;
    }
  },
};

function getSystemTheme() {
  try {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  } catch {
    return "light";
  }
}

function* initializeThemeSaga() {
  try {
    let themeMode = yield call(themeStorageHelpers.load);
    if (!themeMode) {
      themeMode = yield call(getSystemTheme);
      yield call(themeStorageHelpers.save, themeMode);
    }
    if (!["light", "dark"].includes(themeMode)) themeMode = "light";
    yield put(initializeThemeSuccess(themeMode));
  } catch (error) {
    yield put(initializeThemeFailure(error.message));
    yield put(initializeThemeSuccess("light"));
  }
}

function* setThemeAsyncSaga(action) {
  try {
    const newTheme = action.payload;
    if (!["light", "dark"].includes(newTheme))
      throw new Error(`Invalid theme mode: ${newTheme}`);
    const saved = yield call(themeStorageHelpers.save, newTheme);
    if (!saved) throw new Error("Failed to save theme to localStorage");
    yield call(() => new Promise((resolve) => setTimeout(resolve, 100)));
    yield put(setThemeAsyncSuccess(newTheme));
  } catch (error) {
    yield put(setThemeAsyncFailure(error.message));
  }
}

function* toggleThemeSaga() {
  try {
    const currentTheme = yield select(selectThemeMode);
    const newTheme = currentTheme === "light" ? "dark" : "light";
    yield call(themeStorageHelpers.save, newTheme);
  } catch (error) {
    yield put(setThemeAsyncFailure(error.message));
  }
}

function* clearThemeDataSaga() {
  try {
    yield call(themeStorageHelpers.remove);
    const systemTheme = yield call(getSystemTheme);
    yield put(initializeThemeSuccess(systemTheme));
  } catch (error) {
    yield put(setThemeAsyncFailure(error.message));
  }
}

export default function* themeSaga() {
  yield takeLatest(initializeTheme.type, initializeThemeSaga);
  yield takeLatest(setThemeAsync.type, setThemeAsyncSaga);
  yield takeEvery(toggleTheme.type, toggleThemeSaga);
}

export {
  initializeThemeSaga,
  setThemeAsyncSaga,
  toggleThemeSaga,
  clearThemeDataSaga,
  themeStorageHelpers,
};
