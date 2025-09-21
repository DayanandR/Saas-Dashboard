import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { store } from "./redux/store";
import { initializeTheme, selectThemeMode } from "./redux/slices/themeSlice";

import Sidebar from "./components/Sidebar";
import RightSidebar from "./components/RightSidebar";
import Header from "./components/Header/Header";
import DashboardPage from "./pages/DashboardPage";
import { lightTheme, darkTheme } from "./config/theme";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "./contexts/ThemeContext";
import OrdersPage from "./pages/OrdersPage";

const MainLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(!isMobile);
    setRightSidebarOpen(!isMobile);
  }, [isMobile]);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleRightSidebarToggle = () => {
    setRightSidebarOpen(!rightSidebarOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar open={sidebarOpen} onToggle={handleSidebarToggle} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: `calc(100% - ${sidebarOpen ? "280px" : "65px"} - ${
            rightSidebarOpen ? "320px" : "0px"
          })`,
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Header
          onRightSidebarToggle={handleRightSidebarToggle}
          onSidebarToggle={handleSidebarToggle}
        />
        <Box
          sx={{
            flex: 1,
            p: 3,
            backgroundColor: theme.palette.background.default,
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </Box>

      {rightSidebarOpen && <RightSidebar />}
    </Box>
  );
};

const ThemeWrapper = ({ children }) => {
  const themeMode = useSelector(selectThemeMode);
  const currentTheme = themeMode === "dark" ? darkTheme : lightTheme;

  return (
    <MuiThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

const ThemedApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeTheme());
  }, [dispatch]);

  return (
    <ThemeWrapper>
      <Router>
        <Routes>
          <Route
            path="/*"
            element={
              <MainLayout>
                <DashboardPage />
              </MainLayout>
            }
          />
          <Route
            path="/orders"
            element={
              <MainLayout>
                <OrdersPage />
              </MainLayout>
            }
          />
        </Routes>
      </Router>
    </ThemeWrapper>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ThemedApp />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
