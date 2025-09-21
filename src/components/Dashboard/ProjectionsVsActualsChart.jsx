import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Box, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";

const ChartContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 12,
  padding: theme.spacing(3),
  border: `1px solid ${theme.palette.divider}`,
  height: "200px",
  width: "360px",
  minHeight: 300,
  maxWidth: "100%", 
  minWidth: "100%", 
  display: "flex",
  flexDirection: "column",
  fontFamily: theme.typography.fontFamily,
  boxSizing: "border-box",
  flex: 1, 
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[4],
  },
}));

const data = [
  { month: "Jan", actual: 16, projection: 4 },
  { month: "Feb", actual: 20, projection: 5 },
  { month: "Mar", actual: 17, projection: 4 },
  { month: "Apr", actual: 22, projection: 6 },
  { month: "May", actual: 13, projection: 5 },
  { month: "Jun", actual: 20, projection: 6 },
];

const ProjectionsVsActualsChart = () => {
  const theme = useTheme();

  const actualColor = theme.palette.mode === "dark" ? "#60a5fa" : "#60a5fa";
  const projectionColor = theme.palette.mode === "dark" ? "#bfdbfe" : "#bfdbfe";
  const textColor = theme.palette.text.secondary;
  const gridColor = theme.palette.divider;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            padding: 1.5,
            boxShadow: theme.shadows[4],
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
            {label}
          </Typography>
          {payload.map((entry, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{
                color: entry.color,
                fontSize: "12px",
              }}
            >
              {entry.name === "actual" ? "Actual" : "Projection"}: {entry.value}M
            </Typography>
          ))}
        </Box>
      );
    }
    return null;
  };

  return (
    <ChartContainer>
      <Typography
        variant="h6"
        sx={{
          color: theme.palette.text.primary,
          fontWeight: 600,
          fontSize: "18px",
          marginBottom: 3,
        }}
      >
        Projections vs Actuals
      </Typography>

      <Box 
        sx={{ 
          flexGrow: 1, 
          width: "100%",
          height: "100%",
          minHeight: 250,
          position: "relative", 
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            barCategoryGap="20%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={gridColor}
              strokeOpacity={0.3}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: textColor,
                fontWeight: 500,
                fontFamily: theme.typography.fontFamily,
              }}
              dy={5}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: textColor,
                fontWeight: 500,
                fontFamily: theme.typography.fontFamily,
              }}
              tickFormatter={(value) => `${value}M`}
              domain={[0, 30]}
              ticks={[0, 10, 20, 30]}
              width={30}
            />
            <Tooltip content={<CustomTooltip />} />

            <Bar
              dataKey="actual"
              fill={actualColor}
              stackId="a"
              name="actual"
            />

            <Bar
              dataKey="projection"
              fill={projectionColor}
              stackId="a"
              radius={[4, 4, 0, 0]}
              name="projection"
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </ChartContainer>
  );
};

export default ProjectionsVsActualsChart;
