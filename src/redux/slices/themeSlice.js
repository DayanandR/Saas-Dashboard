import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

const initialState = {
  mode: getInitialTheme(),
  isLoading: false,
  error: null,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newMode = state.mode === "light" ? "dark" : "light";
      state.mode = newMode;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newMode);
        document.documentElement.setAttribute('data-theme', newMode);
      }
    },

    setTheme: (state, action) => {
      state.mode = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', action.payload);
        document.documentElement.setAttribute('data-theme', action.payload);
      }
    },

    initializeTheme: (state) => {
      const theme = getInitialTheme();
      state.mode = theme;
      if (typeof window !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme);
      }
    },

    setThemeAsync: (state) => {
      state.isLoading = true;
    },

    setThemeAsyncSuccess: (state, action) => {
      state.mode = action.payload;
      state.isLoading = false;
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', action.payload);
        document.documentElement.setAttribute('data-theme', action.payload);
      }
    },

    setThemeAsyncFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    initializeThemeSuccess: (state, action) => {
      state.mode = action.payload;
      state.isLoading = false;
    },

    initializeThemeFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    clearThemeError: (state) => {
      state.error = null;
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  setThemeAsync,
  setThemeAsyncSuccess,
  setThemeAsyncFailure,
  initializeTheme,
  initializeThemeSuccess,
  initializeThemeFailure,
  clearThemeError,
} = themeSlice.actions;

export const selectThemeMode = (state) => state.theme.mode;
export const selectThemeLoading = (state) => state.theme.isLoading;
export const selectThemeError = (state) => state.theme.error;
export const selectIsDarkMode = (state) => state.theme.mode === "dark";
export const selectIsLightMode = (state) => state.theme.mode === "light";

export default themeSlice.reducer;
