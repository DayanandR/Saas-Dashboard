import React from "react";
import {
  Box,
  Typography,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const ProductCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== "highlight",
})(({ theme, highlight }) => ({
  backgroundColor: highlight
    ? theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.05)"
      : "rgba(0, 123, 255, 0.08)"
    : theme.palette.background.paper,
  borderRadius: 12,
  padding: theme.spacing(2.5, 2),
  border: "1px solid",
  borderColor: theme.palette.divider,
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  "& .MuiTableCell-head": {
    backgroundColor: "transparent",
    color: theme.palette.text.secondary,
    fontWeight: 500,
    fontSize: "14px",
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1.5, 0),
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td": {
    borderBottom: 0,
  },
  "& .MuiTableCell-body": {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1.5, 0),
    fontSize: "15px",
  },
}));

const ProductNameCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
}));

const DataCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 400,
}));

const AmountCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 600,
}));

const productsData = [
  {
    name: "ASOS Ridley High Waist",
    price: "$79.49",
    quantity: 82,
    amount: "$6,518.18",
  },
  {
    name: "Marco Lightweight Shirt",
    price: "$128.50",
    quantity: 37,
    amount: "$4,754.50",
  },
  {
    name: "Half Sleeve Shirt",
    price: "$39.99",
    quantity: 64,
    amount: "$2,559.36",
  },
  {
    name: "Lightweight Jacket",
    price: "$20.00",
    quantity: 184,
    amount: "$3,680.00",
  },
  {
    name: "Marco Shoes",
    price: "$79.49",
    quantity: 64,
    amount: "$1,965.81",
  },
];

const TopSellingProducts = ({ highlight = false }) => {
  const theme = useTheme();

  return (
    <ProductCard
      highlight={highlight ? 1 : 0}
      sx={{ flex: 1, display: "flex", flexDirection: "column" }}
    >
      <Typography
        variant="h6"
        sx={{
          fontSize: "18px",
          fontWeight: 600,
          color: theme.palette.text.primary,
          marginBottom: 2,
        }}
      >
        Top Selling Products
      </Typography>

      {/* Table should expand to fill remaining space */}
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <StyledTableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">Amount</TableCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {productsData.map((product, index) => (
                <StyledTableRow key={index}>
                  <ProductNameCell>{product.name}</ProductNameCell>
                  <DataCell align="left">{product.price}</DataCell>
                  <DataCell align="left">{product.quantity}</DataCell>
                  <AmountCell align="left">{product.amount}</AmountCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ProductCard>
  );
};

export default TopSellingProducts;
