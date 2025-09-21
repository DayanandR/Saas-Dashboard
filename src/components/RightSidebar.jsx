import React from "react";
import { Box, Typography, Avatar, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Bug, UserPlus, Radio } from "lucide-react";

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 280,
  height: "100%",
  backgroundColor: theme.palette.background.paper,
  borderLeft: `1px solid ${theme.palette.divider}`,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
}));

const ScrollableContent = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: "auto",
  overflowX: "hidden",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.divider,
    borderRadius: "3px",
    "&:hover": {
      background: theme.palette.text.disabled,
    },
  },
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
}));

const ItemContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  padding: theme.spacing(1, 0),
  cursor: "pointer",
}));

const IconContainer = styled(Box)(({ theme }) => ({
  width: 24,
  height: 24,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
}));

const TextContainer = styled(Box)({
  flex: 1,
  minWidth: 0,
});

const ItemTitle = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 500,
  color: theme.palette.text.primary,
  lineHeight: 1.4,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

const ItemTime = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.text.secondary,
  lineHeight: 1.4,
  marginTop: 2,
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  padding: theme.spacing(1, 0),
  cursor: "pointer",
}));

const RightSidebar = () => {
  const theme = useTheme();

  const notifications = [
    {
      icon: <Bug size={18} />,
      title: "You have a bug that needs...",
      time: "Just now",
    },
    {
      icon: <UserPlus size={18} />,
      title: "New user registered",
      time: "59 minutes ago",
    },
    {
      icon: <Bug size={18} />,
      title: "You have a bug that needs...",
      time: "12 hours ago",
    },
    {
      icon: <Radio size={18} />,
      title: "Andi Lane subscribed to you",
      time: "Today, 11:59 AM",
    },
  ];

  const activities = [
    {
      avatar: "/api/placeholder/28/28",
      name: "User",
      title: "You have a bug that needs...",
      time: "Just now",
    },
    {
      avatar: "/api/placeholder/28/28",
      name: "User",
      title: "Released a new version",
      time: "59 minutes ago",
    },
    {
      avatar: "/api/placeholder/28/28",
      name: "User",
      title: "Submitted a bug",
      time: "12 hours ago",
    },
  ];

  const contacts = [
    { name: "Natali Craig", avatar: "/api/placeholder/28/28" },
    { name: "Drew Cano", avatar: "/api/placeholder/28/28" },
    { name: "Orlando Diggs", avatar: "/api/placeholder/28/28" },
    { name: "Andi Lane", avatar: "/api/placeholder/28/28" },
  ];

  return (
    <SidebarContainer>
      <HeaderContainer>
        <HeaderTitle>Activity</HeaderTitle>
      </HeaderContainer>

      <ScrollableContent>
        {/* Notifications Section */}
        <SectionContainer>
          <SectionTitle>Notifications</SectionTitle>
          <Box>
            {notifications.map((item, index) => (
              <ItemContainer key={index}>
                <IconContainer>{item.icon}</IconContainer>
                <TextContainer>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemTime>{item.time}</ItemTime>
                </TextContainer>
              </ItemContainer>
            ))}
          </Box>
        </SectionContainer>

        {/* Activities Section */}
        <SectionContainer>
          <SectionTitle>Activities</SectionTitle>
          <Box>
            {activities.map((item, index) => (
              <ItemContainer key={index}>
                <Avatar src={item.avatar} sx={{ width: 28, height: 28 }}>
                  {item.name.charAt(0)}
                </Avatar>
                <TextContainer>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemTime>{item.time}</ItemTime>
                </TextContainer>
              </ItemContainer>
            ))}
          </Box>
        </SectionContainer>

        {/* Contacts Section */}
        <SectionContainer sx={{ borderBottom: "none" }}>
          <SectionTitle>Contacts</SectionTitle>
          <Box>
            {contacts.map((contact, index) => (
              <ContactItem key={index}>
                <Avatar src={contact.avatar} sx={{ width: 28, height: 28 }}>
                  {contact.name.charAt(0)}
                </Avatar>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: theme.palette.text.primary,
                  }}
                >
                  {contact.name}
                </Typography>
              </ContactItem>
            ))}
          </Box>
        </SectionContainer>
      </ScrollableContent>
    </SidebarContainer>
  );
};

export default RightSidebar;
