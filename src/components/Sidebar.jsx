import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Collapse,
  useTheme,
  alpha,
  Tooltip,
} from "@mui/material";
import {
  PieChart,
  Mail,
  Folder,
  Book,
  PersonOutline,
  ChevronRight,
  PeopleAlt,
  RssFeed,
  ChatBubbleOutline,
} from "@mui/icons-material";
import { selectIsDarkMode } from "../redux/slices/themeSlice";
import ByeWindLogo from "../assets/icons/ByeWind.svg";

const SIDEBAR_WIDTH = 280;
const MINI_SIDEBAR_WIDTH = 65;

const navigationConfig = {
  favorites: [
    { id: "overview", label: "Overview", path: "/overview" },
    { id: "projects", label: "Projects", path: "/projects" },
  ],
  dashboards: [
    { id: "default", label: "Default", icon: PieChart, path: "/dashboard" },
    {
      id: "ecommerce",
      label: "eCommerce",
      icon: Mail,
      path: "/dashboard/ecommerce",
    },
    {
      id: "projects-dash",
      label: "Projects",
      icon: Folder,
      path: "/dashboard/projects",
    },
    {
      id: "courses",
      label: "Online Courses",
      icon: Book,
      path: "/dashboard/courses",
    },
  ],
  pages: [
    {
      id: "user-profile",
      label: "User Profile",
      icon: PersonOutline,
      expandable: true,
      children: [
        {
          id: "profile-overview",
          label: "Overview",
          path: "/profile/overview",
        },
        {
          id: "profile-projects",
          label: "Projects",
          path: "/profile/projects",
        },
        {
          id: "profile-campaigns",
          label: "Campaigns",
          path: "/profile/campaigns",
        },
        {
          id: "profile-documents",
          label: "Documents",
          path: "/profile/documents",
        },
        {
          id: "profile-followers",
          label: "Followers",
          path: "/profile/followers",
        },
      ],
    },
    { id: "account", label: "Account", icon: PeopleAlt, path: "/account" },
    { id: "blog", label: "Blog", icon: RssFeed, path: "/blog" },
    { id: "social", label: "Social", icon: ChatBubbleOutline, path: "/social" },
  ],
};

const Sidebar = ({ open = true }) => {
  const theme = useTheme();
  const isDarkMode = useSelector(selectIsDarkMode);
  const navigate = useNavigate();

  const [activeItem, setActiveItem] = useState("default");
  const [expandedItems, setExpandedItems] = useState({ "user-profile": true });
  const [activeFavTab, setActiveFavTab] = useState("Favorites");

  const handleItemClick = (itemId, path) => {
    if (path) {
      setActiveItem(itemId);
      navigate(path);
    }
  };

  const handleExpandToggle = (itemId) => {
    // Don't allow expanding when sidebar is collapsed
    if (!open) return;
    setExpandedItems((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const SectionHeader = ({ title }) => (
    <Typography
      variant="overline"
      sx={{
        fontWeight: 600,
        color: theme.palette.text.disabled,
        px: 2,
        mt: 3,
        mb: 1,
        display: open ? "block" : "none", // Hide section headers when collapsed
      }}
    >
      {title}
    </Typography>
  );

  const NavigationItem = ({ item }) => {
    const isActive = activeItem === item.id;
    const isExpanded = expandedItems[item.id] && open; // Only expand when sidebar is open
    const hasChildren = item.children && item.children.length > 0;

    const ItemButton = (
      <ListItemButton
        selected={isActive}
        onClick={() =>
          hasChildren
            ? handleExpandToggle(item.id)
            : handleItemClick(item.id, item.path)
        }
        sx={{
          minHeight: 44,
          borderRadius: 1.5,
          mx: open ? 1.5 : 0.5,
          mb: 0.5,
          position: "relative",
          justifyContent: open ? "initial" : "center",
          px: open ? 2 : 1,
          color: isActive
            ? theme.palette.text.primary
            : theme.palette.text.secondary,
          backgroundColor: isActive
            ? alpha(theme.palette.action.selected, isDarkMode ? 0.2 : 0.08)
            : "transparent",
          "&:hover": {
            backgroundColor: alpha(theme.palette.action.hover, 0.04),
          },
          "&.Mui-selected::before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            height: "50%",
            width: "3px",
            backgroundColor: theme.palette.text.primary,
            borderRadius: "0 3px 3px 0",
          },
        }}
      >
        {hasChildren && open && (
          <ChevronRight
            sx={{
              fontSize: 18,
              color: theme.palette.text.secondary,
              mr: 1,
              transform: isExpanded ? "rotate(90deg)" : "none",
              transition: "transform 0.2s",
            }}
          />
        )}
        <ListItemIcon
          sx={{
            minWidth: "auto",
            mr: open ? 1.5 : "auto",
            color: "inherit",
            justifyContent: "center",
          }}
        >
          <item.icon sx={{ fontSize: 22, strokeWidth: 0.5 }} />
        </ListItemIcon>
        {open && (
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{
              fontSize: "0.9rem",
              fontWeight: isActive ? 600 : 500,
            }}
          />
        )}
      </ListItemButton>
    );

    return (
      <>
        {!open && hasChildren ? (
          <Tooltip title={item.label} placement="right">
            {ItemButton}
          </Tooltip>
        ) : !open ? (
          <Tooltip title={item.label} placement="right">
            {ItemButton}
          </Tooltip>
        ) : (
          ItemButton
        )}
        {hasChildren && open && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              sx={{ pl: 5, mt: 0.5, mb: 0.5 }}
            >
              {item.children.map((child) => (
                <ListItemButton
                  key={child.id}
                  selected={activeItem === child.id}
                  onClick={() => handleItemClick(child.id, child.path)}
                  sx={{
                    minHeight: 38,
                    py: 0.2,
                    pl: 2,
                    borderRadius: 1.5,
                    color:
                      activeItem === child.id
                        ? theme.palette.text.primary
                        : theme.palette.text.secondary,
                    "& .MuiListItemText-primary": {
                      fontSize: "0.875rem",
                      fontWeight: activeItem === child.id ? 500 : 400,
                    },
                  }}
                >
                  <ListItemText primary={child.label} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        )}
      </>
    );
  };

  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Logo + Title */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: open ? 1.5 : 0,
          p: 2,
          pb: 1,
          justifyContent: open ? "flex-start" : "center",
        }}
      >
        <Box
          component="img"
          src={ByeWindLogo}
          alt="byewind"
          sx={{ width: 32, height: 32, objectFit: "contain" }}
        />
        {open && (
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: theme.palette.text.primary }}
          >
            ByeWind
          </Typography>
        )}
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
        {/* Favorites */}
        {open && (
          <Box sx={{ px: 2, mt: 2 }}>
            <Box sx={{ display: "flex", mb: 1.5 }}>
              {["Favorites", "Recently"].map((tab) => (
                <Typography
                  key={tab}
                  variant="body2"
                  onClick={() => setActiveFavTab(tab)}
                  sx={{
                    fontWeight: 600,
                    mr: 2.5,
                    cursor: "pointer",
                    color:
                      activeFavTab === tab
                        ? theme.palette.text.primary
                        : theme.palette.text.disabled,
                  }}
                >
                  {tab}
                </Typography>
              ))}
            </Box>
            <List component="nav" disablePadding>
              {navigationConfig.favorites.map((item) => (
                <ListItemButton
                  key={item.id}
                  onClick={() => handleItemClick(item.id, item.path)}
                  sx={{ py: 0.5, px: 1, borderRadius: 1.5 }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      bgcolor: theme.palette.text.secondary,
                      borderRadius: "50%",
                      mr: 1.5,
                      ml: 0.5,
                    }}
                  />
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      color: theme.palette.text.primary,
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>
        )}

        {/* Dashboards */}
        <SectionHeader title="Dashboards" />
        <List component="nav" disablePadding>
          {navigationConfig.dashboards.map((item) => (
            <NavigationItem key={item.id} item={item} />
          ))}
        </List>

        {/* Pages */}
        <SectionHeader title="Pages" />
        <List component="nav" disablePadding>
          {navigationConfig.pages.map((item) => (
            <NavigationItem key={item.id} item={item} />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? SIDEBAR_WIDTH : MINI_SIDEBAR_WIDTH,
        flexShrink: 0,
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        "& .MuiDrawer-paper": {
          width: open ? SIDEBAR_WIDTH : MINI_SIDEBAR_WIDTH,
          boxSizing: "border-box",
          backgroundColor: theme.palette.background.default,
          borderRight: `1px solid ${theme.palette.divider}`,
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          overflowX: "hidden",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
