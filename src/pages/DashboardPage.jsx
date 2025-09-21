import { Box, Grid, Typography, useTheme } from "@mui/material";
import StatsGrid from "../components/Dashboard/StatsGrid";
import ProjectionsVsActualsChart from "../components/Dashboard/ProjectionsVsActualsChart";
import RevenueChart from "../components/Dashboard/RevenueChart";
import RevenueByLocation from "../components/Dashboard/LocationCard";
import TopSellingProducts from "../components/Dashboard/TopSellingProducts";
import TotalSales from "../components/Dashboard/TotalSales";

const DashboardPage = () => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 3, width: "100%" }}>
      <Box mb={4}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
            fontSize: "28px",
          }}
        >
          eCommerce Dashboard
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Box sx={{ height: "100%", display: "flex" }}>
            <StatsGrid />
          </Box>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Box sx={{ height: "100%", display: "flex" }}>
            <ProjectionsVsActualsChart />
          </Box>
        </Grid>

        <Grid item xs={12} lg={8}>
          <Box sx={{ height: { xs: 350, lg: "100%" }, display: "flex" }}>
            <RevenueChart />
          </Box>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Box sx={{ height: { xs: 350, lg: "100%" }, display: "flex" }}>
            <RevenueByLocation />
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 2,
          my: 2,
        }}
      >
        <Box
          sx={{
            flex: { xs: "1", lg: "2" },
            minHeight: "400px",
          }}
        >
          <TopSellingProducts />
        </Box>
        <Box
          sx={{
            flex: { xs: "1", lg: "1" },
            minHeight: "400px",
          }}
        >
          <TotalSales />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
