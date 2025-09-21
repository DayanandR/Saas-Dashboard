import { createTheme } from "@mui/material/styles";

const lightColors = {
  primary: {
    main: "#1976d2",
    light: "#42a5f5",
    dark: "#1565c0",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#9c27b0",
    light: "#ba68c8",
    dark: "#7b1fa2",
    contrastText: "#ffffff",
  },
  background: {
    default: "#fafafa",
    paper: "#ffffff",
    sidebar: "#ffffff",
    sidebarHover: "#f5f5f5",
    sidebarActive: "#e3f2fd",
  },
  text: {
    primary: "#212121",
    secondary: "#757575",
    disabled: "#bdbdbd",
    sidebar: "#424242",
    sidebarSecondary: "#757575",
  },
  divider: "#e0e0e0",
  sidebar: {
    background: "#ffffff",
    text: "#424242",
    textSecondary: "#757575",
    hover: "#f5f5f5",
    active: "#e3f2fd",
    activeText: "#1976d2",
    border: "#e0e0e0",
    iconColor: "#757575",
    activeIconColor: "#1976d2",
  },
  success: {
    main: "#2e7d32",
    light: "#4caf50",
    dark: "#1b5e20",
  },
  error: {
    main: "#d32f2f",
    light: "#ef5350",
    dark: "#c62828",
  },
  warning: {
    main: "#ed6c02",
    light: "#ff9800",
    dark: "#e65100",
  },
  info: {
    main: "#0288d1",
    light: "#03a9f4",
    dark: "#01579b",
  },
};

const darkColors = {
  primary: {
    main: "#90caf9",
    light: "#bbdefb",
    dark: "#42a5f5",
    contrastText: "#000000",
  },
  secondary: {
    main: "#ce93d8",
    light: "#f3e5f5",
    dark: "#ab47bc",
    contrastText: "#000000",
  },
  background: {
    default: "#121212",
    paper: "#1e1e1e",
    sidebar: "#1e1e1e",
    sidebarHover: "#2c2c2c",
    sidebarActive: "#1e3a8a",
  },
  text: {
    primary: "#ffffff",
    secondary: "#aaaaaa",
    disabled: "#666666",
    sidebar: "#ffffff",
    sidebarSecondary: "#aaaaaa",
  },
  divider: "#333333",
  sidebar: {
    background: "#1e1e1e",
    text: "#ffffff",
    textSecondary: "#aaaaaa",
    hover: "#2c2c2c",
    active: "#1e3a8a",
    activeText: "#90caf9",
    border: "#333333",
    iconColor: "#aaaaaa",
    activeIconColor: "#90caf9",
  },
  success: {
    main: "#66bb6a",
    light: "#81c784",
    dark: "#388e3c",
  },
  error: {
    main: "#f44336",
    light: "#ef5350",
    dark: "#c62828",
  },
  warning: {
    main: "#ffa726",
    light: "#ffb74d",
    dark: "#f57c00",
  },
  info: {
    main: "#29b6f6",
    light: "#4fc3f7",
    dark: "#0277bd",
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    ...lightColors,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 300,
      lineHeight: 1.167,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 300,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 400,
      lineHeight: 1.167,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 400,
      lineHeight: 1.235,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 400,
      lineHeight: 1.334,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.6,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.57,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.43,
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.75,
      textTransform: "uppercase",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1.66,
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 2.66,
      textTransform: "uppercase",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: lightColors.sidebar.background,
          borderRight: `1px solid ${lightColors.sidebar.border}`,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: lightColors.sidebar.hover,
          },
          "&.Mui-selected": {
            backgroundColor: lightColors.sidebar.active,
            color: lightColors.sidebar.activeText,
            "&:hover": {
              backgroundColor: lightColors.sidebar.active,
            },
            "& .MuiListItemIcon-root": {
              color: lightColors.sidebar.activeIconColor,
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: lightColors.sidebar.iconColor,
          minWidth: "40px",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: lightColors.sidebar.text,
          fontSize: "0.875rem",
          fontWeight: 500,
        },
        secondary: {
          color: lightColors.sidebar.textSecondary,
          fontSize: "0.75rem",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    ...darkColors,
  },
  typography: lightTheme.typography, 
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: darkColors.sidebar.background,
          borderRight: `1px solid ${darkColors.sidebar.border}`,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: darkColors.sidebar.hover,
          },
          "&.Mui-selected": {
            backgroundColor: darkColors.sidebar.active,
            color: darkColors.sidebar.activeText,
            "&:hover": {
              backgroundColor: darkColors.sidebar.active,
            },
            "& .MuiListItemIcon-root": {
              color: darkColors.sidebar.activeIconColor,
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: darkColors.sidebar.iconColor,
          minWidth: "40px",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: darkColors.sidebar.text,
          fontSize: "0.875rem",
          fontWeight: 500,
        },
        secondary: {
          color: darkColors.sidebar.textSecondary,
          fontSize: "0.75rem",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: darkColors.background.default,
          color: darkColors.text.primary,
        },
      },
    },
  },
});

export const themeConfig = {
  light: lightColors,
  dark: darkColors,
};

export default { lightTheme, darkTheme, themeConfig };
