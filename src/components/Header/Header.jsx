import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Avatar,
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import {
  Search as SearchIcon,
  NotificationsNone as NotificationsNoneIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import CollapseIcon from "../../assets/icons/sidebar-collapse.svg";
import StarIcon from "../../assets/icons/star-icon.svg";
import DarkCollapseIcon from "../../assets/icons/sidebar-collpase-dark.svg";
import DarkStarIcon from "../../assets/icons/star-icon-dark.svg";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, selectIsDarkMode } from "../../redux/slices/themeSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 8,
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.05)"
      : "rgba(0, 0, 0, 0.05)",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.08)"
        : "rgba(0, 0, 0, 0.08)",
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: "100%",
  maxWidth: 360,
  [theme.breakpoints.down("sm")]: {
    maxWidth: 200,
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.03)",
  borderBottom: "1px solid",
  borderColor: theme.palette.divider,
}));

const UserMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    width: 240,
    marginTop: theme.spacing(1),
    boxShadow: theme.shadows[3],
  },
  "& .MuiMenuItem-root": {
    padding: theme.spacing(1.5, 2),
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
    color: theme.palette.text.secondary,
  },
}));

const Header = ({ onRightSidebarToggle, isMobile, onSidebarToggle }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectIsDarkMode);

  const pathnames = location.pathname.split("/").filter((x) => x);

  const handleUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    navigate("/login");
  };

  return (
    <>
      <StyledAppBar position="static" elevation={0}>
        <Toolbar
          sx={{
            px: { xs: 2, sm: 3 },
            minHeight: { xs: 56, sm: 64 },
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Left side: icons + breadcrumbs */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img
              src={isDarkMode ? DarkCollapseIcon : CollapseIcon}
              alt="icon"
              style={{ cursor: "pointer" }}
              onClick={onSidebarToggle}
            />
            <img
              src={isDarkMode ? DarkStarIcon : StarIcon}
              alt="icon"
              style={{ marginRight: 10, cursor: "pointer" }}
            />
            <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: "0.875rem" }}>
              <Link
                component={RouterLink}
                to="/"
                underline="hover"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                Dashboard
              </Link>
              {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                const isLast = index === pathnames.length - 1;

                return isLast ? (
                  <Typography
                    key={name}
                    color="text.primary"
                    sx={{ fontSize: "0.875rem" }}
                  >
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Typography>
                ) : (
                  <Link
                    key={name}
                    component={RouterLink}
                    to={routeTo}
                    underline="hover"
                    color="text.secondary"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Link>
                );
              })}
            </Breadcrumbs>
          </Box>

          {/* Right side: search + actions */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon fontSize="small" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search for projects, tasks, or teams..."
                inputProps={{ "aria-label": "search" }}
                sx={{
                  "& .MuiInputBase-input": {
                    padding: "8px 8px 8px 0",
                    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                    width: "100%",
                    fontSize: "0.875rem",
                  },
                }}
              />
            </Search>

            {/* Actions (theme toggle, notifications, user menu) */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {!isMobile && (
                <Tooltip title={isDarkMode ? "Light Mode" : "Dark Mode"}>
                  <IconButton
                    onClick={() => dispatch(toggleTheme())}
                    color="inherit"
                    size="small"
                  >
                    {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                  </IconButton>
                </Tooltip>
              )}

              <Tooltip title="Notifications">
                <IconButton color="inherit" size="small">
                  <Badge badgeContent={3} color="error">
                    <NotificationsNoneIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Toggle">
                <IconButton
                  color="inherit"
                  size="small"
                  onClick={onRightSidebarToggle}
                >
                  <img
                    src={isDarkMode ? DarkCollapseIcon : CollapseIcon}
                    alt="collapse icon"
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Toolbar>
      </StyledAppBar>

      {/* User Menu */}
      <UserMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="subtitle1" fontWeight={500}>
            Brooklyn Simmons
          </Typography>
          <Typography variant="body2" color="text.secondary">
            brooklyn@example.com
          </Typography>
        </Box>

        <MenuItem>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </UserMenu>
    </>
  );
};

export default Header;
