import React, { useRef, useEffect, useState } from "react";
import { Box, Typography, useTheme, List, ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled components
const Container = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 12,
  padding: theme.spacing(3),
  border: `1px solid ${theme.palette.divider}`,
  height: "100%",
  minHeight: 350,
  display: "flex",
  flexDirection: "column",
}));

const ChartContainer = styled(Box)({
  position: "relative",
  width: "100%",
  flex: 1,
  marginBottom: 24,
});

const LegendContainer = styled(List)({
  padding: 0,
  margin: 0,
});

const LegendItem = styled(ListItem)({
  padding: "4px 0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const ColorDot = styled(Box)(({ color }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: color,
  marginRight: 8,
}));

// Sales data
const salesData = [
  { name: "Direct", value: 300.56, color: "#1f2937" },
  { name: "Affiliate", value: 135.18, color: "#8b5cf6" },
  { name: "Sponsored", value: 154.02, color: "#06b6d4" },
  { name: "E-mail", value: 48.96, color: "#10b981" },
];

// Responsive Donut Chart
const DonutChart = () => {
  const theme = useTheme();
  const containerRef = useRef(null);
  const [size, setSize] = useState(0);

  // Update size dynamically based on container width
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setSize(containerRef.current.offsetWidth);
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const strokeWidth = size * 0.15; // 15% of size
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const total = salesData.reduce((sum, item) => sum + item.value, 0);

  let cumulativePercentage = 0;

  return (
    <Box
      ref={containerRef}
      sx={{ width: "100%", height: "100%", position: "relative" }}
    >
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {salesData.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const strokeDasharray = `${
            (percentage / 100) * circumference
          } ${circumference}`;
          const strokeDashoffset =
            -(cumulativePercentage / 100) * circumference;

          cumulativePercentage += percentage;

          return (
            <circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {/* Center label */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            fontSize: size * 0.18, // scale font size
          }}
        >
          38.6%
        </Typography>
      </Box>
    </Box>
  );
};

const TotalSales = () => {
  const theme = useTheme();

  return (
    <Container>
      <Typography
        variant="h6"
        sx={{
          color: theme.palette.text.primary,
          fontWeight: 600,
          fontSize: 18,
          mb: 3,
        }}
      >
        Total Sales
      </Typography>

      <ChartContainer>
        <DonutChart />
      </ChartContainer>

      <LegendContainer>
        {salesData.map((item) => (
          <LegendItem key={item.name}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ColorDot color={item.color} />
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary }}
              >
                {item.name}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.primary, fontWeight: 600 }}
            >
              ${item.value.toFixed(2)}
            </Typography>
          </LegendItem>
        ))}
      </LegendContainer>
    </Container>
  );
};

export default TotalSales;
