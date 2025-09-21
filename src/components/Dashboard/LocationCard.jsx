import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import LocationImage from "../../assets/images/location.png";

const LocationCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 12,
  padding: theme.spacing(2.5, 3),
  border: `1px solid ${theme.palette.divider}`,
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const MapContainer = styled(Box)(({ theme }) => ({
  borderRadius: 8,
  marginBottom: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  minHeight: 120,
}));

const LocationItem = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateAreas: `
    "city revenue"
    "bar bar"
  `,
  gridTemplateColumns: "1fr auto",
  gap: theme.spacing(0.5, 2),
  padding: theme.spacing(1.5, 0),
  alignItems: "center",
}));

const RevenueProgressBar = styled(Box)(({ theme, width }) => ({
  gridArea: "bar",
  height: "4px",
  width: "100%",
  backgroundColor: theme.palette.divider,
  borderRadius: 2,
  position: "relative",
  overflow: "hidden",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: width,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 2,
  },
}));

const locationData = [
  { city: "New York", revenue: "72K", progress: "85%" },
  { city: "San Francisco", revenue: "39K", progress: "45%" },
  { city: "Sydney", revenue: "25K", progress: "30%" },
  { city: "Singapore", revenue: "61K", progress: "70%" },
];

const RevenueByLocation = () => {
  const theme = useTheme();

  return (
    <LocationCard>
      <Typography
        variant="h6"
        sx={{
          fontSize: "18px",
          fontWeight: 600,
          color: theme.palette.text.primary,
          marginBottom: 2,
        }}
      >
        Revenue by Location
      </Typography>

      <MapContainer>
        <Box
          component="img"
          src={LocationImage}
          alt="World Map"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </MapContainer>

      <Box sx={{ flexGrow: 1 }}>
        {locationData.map((location) => (
          <LocationItem key={location.city}>
            <Typography
              sx={{
                gridArea: "city",
                fontSize: "15px",
                fontWeight: 500,
                color: theme.palette.text.secondary,
              }}
            >
              {location.city}
            </Typography>
            <Typography
              sx={{
                gridArea: "revenue",
                fontSize: "15px",
                fontWeight: 600,
                color: theme.palette.text.primary,
              }}
            >
              {location.revenue}
            </Typography>
            <RevenueProgressBar width={location.progress} />
          </LocationItem>
        ))}
      </Box>
    </LocationCard>
  );
};

export default RevenueByLocation;
