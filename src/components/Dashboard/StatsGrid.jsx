import { Grid, Box } from "@mui/material";
import StatsCard from "./StatsCard";

const statsData = [
  {
    title: "Customers",
    value: "3,781",
    change: "+11.01%",
    highlight: true,
    isPositive: true,
  },
  {
    title: "Orders",
    value: "1,219",
    change: "-0.03%",
    isPositive: false,
    highlight: false,
  },
  {
    title: "Revenue",
    value: "$695",
    change: "+15.03%",
    isPositive: true,
    highlight: false,
  },
  {
    title: "Growth",
    value: "30.1%",
    change: "+6.08%",
    highlight: true,
    isPositive: true,
  },
];

const StatsGrid = () => {
  return (
    <Box>
      <Grid container spacing={3} sx={{ marginBottom: 3 }}>
        <Grid item xs={6}>
          <StatsCard
            title={statsData[0].title}
            value={statsData[0].value}
            change={statsData[0].change}
            isPositive={statsData[0].isPositive}
            highlight={statsData[0].highlight}
          />
        </Grid>
        <Grid item xs={6}>
          <StatsCard
            title={statsData[1].title}
            value={statsData[1].value}
            change={statsData[1].change}
            isPositive={statsData[1].isPositive}
            highlight={statsData[1].highlight}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <StatsCard
            title={statsData[2].title}
            value={statsData[2].value}
            change={statsData[2].change}
            isPositive={statsData[2].isPositive}
            highlight={statsData[2].highlight}
          />
        </Grid>
        <Grid item xs={6}>
          <StatsCard
            title={statsData[3].title}
            value={statsData[3].value}
            change={statsData[3].change}
            isPositive={statsData[3].isPositive}
            highlight={statsData[3].highlight}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatsGrid;
