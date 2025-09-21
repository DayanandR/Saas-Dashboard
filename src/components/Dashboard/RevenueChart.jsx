import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const ChartContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "highlight",
})(({ theme, highlight }) => ({
  backgroundColor: highlight
    ? theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.05)"
      : "rgba(0, 123, 255, 0.08)"
    : theme.palette.background.paper,
  borderRadius: 12,
  padding: theme.spacing(2.5, 2),
  border: `1px solid ${theme.palette.divider}`,
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "600px",
  boxSizing: "border-box",
}));

const LegendContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
  marginBottom: theme.spacing(2),
  alignItems: "center",
  flexWrap: "wrap",
}));

const LegendItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  fontSize: "14px",
  fontWeight: 500,
}));

const LegendDot = styled("div")(({ color }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: color,
}));

const data = [
  { month: "Jan", currentWeek: 8, previousWeek: 10 },
  { month: "Feb", currentWeek: 16, previousWeek: 6 },
  { month: "Mar", currentWeek: 14, previousWeek: 8 },
  { month: "Apr", currentWeek: 10, previousWeek: 16 },
  { month: "May", currentWeek: 12, previousWeek: 14 },
  { month: "Jun", currentWeek: 18, previousWeek: 20 },
];

const RevenueChart = ({ highlight = false }) => {
  const theme = useTheme();

  return (
    <ChartContainer highlight={highlight ? 1 : 0}>
      <Typography
        variant="h6"
        sx={{
          fontSize: "18px",
          fontWeight: 600,
          color: theme.palette.text.primary,
          marginBottom: 1,
        }}
      >
        Revenue
      </Typography>

      <LegendContainer>
        <LegendItem>
          <LegendDot color="#1f2937" />
          <Typography
            sx={{ color: theme.palette.text.secondary, fontSize: 14 }}
          >
            Current Week
          </Typography>
          <Typography
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 600,
              marginLeft: 0.5,
            }}
          >
            $58,211
          </Typography>
        </LegendItem>

        <LegendItem>
          <LegendDot color="#94a3b8" />
          <Typography
            sx={{ color: theme.palette.text.secondary, fontSize: 14 }}
          >
            Previous Week
          </Typography>
          <Typography
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 600,
              marginLeft: 0.5,
            }}
          >
            $68,768
          </Typography>
        </LegendItem>
      </LegendContainer>

      <Box sx={{ flex: 1, width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: theme.palette.text.secondary,
                fontWeight: 500,
              }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: theme.palette.text.secondary,
                fontWeight: 500,
              }}
              tickFormatter={(value) => `${value}M`}
              domain={[0, 30]}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: theme.shadows[4],
                borderRadius: 8,
                padding: "8px",
              }}
              labelStyle={{ fontWeight: 600 }}
            />
            <Line
              type="monotone"
              dataKey="previousWeek"
              stroke="#94a3b8"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#94a3b8", stroke: "#94a3b8" }}
            />
            <Line
              type="monotone"
              dataKey="currentWeek"
              stroke="#1f2937"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#1f2937", stroke: "#1f2937" }}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </ChartContainer>
  );
};

export default RevenueChart;
