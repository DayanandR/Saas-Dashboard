import { Box, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { TrendingUp, TrendingDown } from "@mui/icons-material";

const Card = styled(Box, {
  shouldForwardProp: (prop) => prop !== "highlight",
})(({ theme, highlight }) => ({
  backgroundColor: highlight
    ? theme.palette.mode === "dark"
      ? "rgba(59, 130, 246, 0.15)"
      : "#e0f2fe"
    : theme.palette.background.paper,
  borderRadius: 16,
  padding: theme.spacing(3, 3.5),
  border: "1px solid",
  borderColor: highlight 
    ? theme.palette.mode === "dark" 
      ? "rgba(59, 130, 246, 0.3)" 
      : "rgba(59, 130, 246, 0.2)"
    : theme.palette.divider,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: 140,
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: theme.palette.mode === "dark" 
      ? "0 8px 32px rgba(0, 0, 0, 0.4)"
      : "0 8px 32px rgba(0, 0, 0, 0.08)",
  },
}));

const StatsCard = ({
  title,
  value,
  change,
  isPositive = true,
  highlight = false,
}) => {
  const theme = useTheme();

  return (
    <Card highlight={highlight ? 1 : 0}>
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.text.secondary,
          fontWeight: 500,
          fontSize: "14px",
          marginBottom: 2,
          letterSpacing: "0.01em",
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            fontSize: "36px",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {value}
        </Typography>

        {change && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.3,
              color: isPositive
                ? theme.palette.mode === "dark" 
                  ? "#4ade80" 
                  : "#16a34a"
                : theme.palette.mode === "dark"
                  ? "#f87171"
                  : "#dc2626",
              fontWeight: 600,
              fontSize: "13px",
            }}
          >
            {isPositive ? (
              <TrendingUp sx={{ fontSize: 16 }} />
            ) : (
              <TrendingDown sx={{ fontSize: 16 }} />
            )}
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "inherit",
                fontSize: "13px",
              }}
            >
              {change}
            </Typography>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default StatsCard;
