import React, { useState, useMemo } from "react";
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
  IconButton,
  TextField,
  Chip,
  Avatar,
  Pagination,
  Checkbox,
  InputAdornment,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Menu,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Plus,
  Filter,
  ArrowUpDown,
  Search,
  MoreHorizontal,
  Calendar,
  ExternalLink,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

const OrderCard = styled(Box, {
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

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  flexWrap: "wrap",
  gap: theme.spacing(1),
}));

const ActionButtonsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  "& .MuiTableCell-head": {
    backgroundColor: "transparent",
    color: theme.palette.text.secondary,
    fontWeight: 500,
    fontSize: "14px",
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1.5, 1),
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td": {
    borderBottom: 0,
  },
  "& .MuiTableCell-body": {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1.5, 1),
    fontSize: "14px",
  },
}));

const UserContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

const SortableHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  gap: 4,
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const StatusChip = styled(Chip)(({ theme, status }) => {
  const getStatusColors = (status) => {
    switch (status) {
      case "Complete":
        return {
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(34, 197, 94, 0.1)"
              : "#dcfce7",
          color: theme.palette.mode === "dark" ? "#4ade80" : "#16a34a",
        };
      case "In Progress":
        return {
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(59, 130, 246, 0.1)"
              : "#dbeafe",
          color: theme.palette.mode === "dark" ? "#60a5fa" : "#2563eb",
        };
      case "Pending":
        return {
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(168, 85, 247, 0.1)"
              : "#f3e8ff",
          color: theme.palette.mode === "dark" ? "#a78bfa" : "#7c3aed",
        };
      case "Approved":
        return {
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(245, 158, 11, 0.1)"
              : "#fef3c7",
          color: theme.palette.mode === "dark" ? "#fbbf24" : "#d97706",
        };
      case "Rejected":
        return {
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(239, 68, 68, 0.1)"
              : "#fee2e2",
          color: theme.palette.mode === "dark" ? "#f87171" : "#dc2626",
        };
      default:
        return {
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(156, 163, 175, 0.1)"
              : "#f3f4f6",
          color: theme.palette.mode === "dark" ? "#9ca3af" : "#6b7280",
        };
    }
  };

  return getStatusColors(status);
});

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: theme.spacing(3),
  paddingTop: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const initialOrdersData = [
  {
    id: "#CM9801",
    user: { name: "Natali Craig", avatar: "/api/placeholder/32/32" },
    project: "Landing Page",
    address: "Meadow Lane Oakland",
    date: "Just now",
    status: "In Progress",
    selected: false,
  },
  {
    id: "#CM9802",
    user: { name: "Kate Morrison", avatar: "/api/placeholder/32/32" },
    project: "CRM Admin pages",
    address: "Larry San Francisco",
    date: "A minute ago",
    status: "Complete",
    selected: false,
  },
  {
    id: "#CM9803",
    user: { name: "Drew Cano", avatar: "/api/placeholder/32/32" },
    project: "Client Project",
    address: "Bagwell Avenue Ocala",
    date: "1 hour ago",
    status: "Pending",
    selected: false,
  },
  {
    id: "#CM9804",
    user: { name: "Orlando Diggs", avatar: "/api/placeholder/32/32" },
    project: "Admin Dashboard",
    address: "Washburn Baton Rouge",
    date: "Yesterday",
    status: "Approved",
    selected: true,
  },
  {
    id: "#CM9805",
    user: { name: "Andi Lane", avatar: "/api/placeholder/32/32" },
    project: "App Landing Page",
    address: "Nest Lane Olivette",
    date: "Feb 2, 2023",
    status: "Rejected",
    selected: false,
  },
  {
    id: "#CM9806",
    user: { name: "John Smith", avatar: "/api/placeholder/32/32" },
    project: "E-commerce Site",
    address: "Main Street Boston",
    date: "Feb 1, 2023",
    status: "Complete",
    selected: false,
  },
  {
    id: "#CM9807",
    user: { name: "Sarah Wilson", avatar: "/api/placeholder/32/32" },
    project: "Mobile App",
    address: "Oak Avenue Chicago",
    date: "Jan 30, 2023",
    status: "In Progress",
    selected: false,
  },
  {
    id: "#CM9808",
    user: { name: "Mike Johnson", avatar: "/api/placeholder/32/32" },
    project: "Portfolio Site",
    address: "Pine Street Seattle",
    date: "Jan 28, 2023",
    status: "Pending",
    selected: false,
  },
];

const OrderList = ({ highlight = false }) => {
  const theme = useTheme();
  const [ordersData, setOrdersData] = useState(initialOrdersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("all");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [newOrder, setNewOrder] = useState({
    user: { name: "", avatar: "/api/placeholder/32/32" },
    project: "",
    address: "",
    status: "Pending",
  });
  const itemsPerPage = 5;

  const filteredAndSortedOrders = useMemo(() => {
    let filtered = ordersData.filter(
      (order) =>
        (statusFilter === "all" || order.status === statusFilter) &&
        (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.status.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        let aValue, bValue;

        if (sortField === "user") {
          aValue = a.user.name.toLowerCase();
          bValue = b.user.name.toLowerCase();
        } else if (sortField === "id") {
          aValue = a.id.toLowerCase();
          bValue = b.id.toLowerCase();
        } else {
          aValue = a[sortField].toLowerCase();
          bValue = b[sortField].toLowerCase();
        }

        if (sortDirection === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    return filtered;
  }, [ordersData, searchTerm, statusFilter, sortField, sortDirection]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedOrders, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedOrders(paginatedOrders.map((order) => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    setSelectedOrders([]);
  };

  const handleAddOrder = () => {
    const orderCount = ordersData.length + 1;
    const newId = `#CM${9800 + orderCount}`;

    const orderToAdd = {
      id: newId,
      user: { ...newOrder.user },
      project: newOrder.project,
      address: newOrder.address,
      date: "Just now",
      status: newOrder.status,
      selected: false,
    };

    setOrdersData([orderToAdd, ...ordersData]);
    setOpenAddDialog(false);
    setNewOrder({
      user: { name: "", avatar: "/api/placeholder/32/32" },
      project: "",
      address: "",
      status: "Pending",
    });
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <ArrowUpDown size={14} />;
    return sortDirection === "asc" ? (
      <ArrowUp size={14} />
    ) : (
      <ArrowDown size={14} />
    );
  };

  return (
    <OrderCard highlight={highlight ? 1 : 0}>
      <HeaderContainer>
        <Typography
          variant="h6"
          sx={{
            fontSize: "18px",
            fontWeight: 600,
            color: theme.palette.text.primary,
          }}
        >
          Order List
        </Typography>

        <ActionButtonsContainer>
          <Tooltip title="Add Order">
            <IconButton size="small" onClick={() => setOpenAddDialog(true)}>
              <Plus size={18} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Filter">
            <IconButton size="small" onClick={handleFilterClick}>
              <Filter size={18} />
            </IconButton>
          </Tooltip>
        </ActionButtonsContainer>
      </HeaderContainer>

      <SearchContainer>
        <TextField
          fullWidth
          size="small"
          placeholder="Search by ID, user, project, address, or status"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={18} color={theme.palette.text.disabled} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />
      </SearchContainer>

      <TableContainer sx={{ flexGrow: 1 }}>
        <Table size="small">
          <StyledTableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedOrders.length > 0 &&
                    selectedOrders.length < paginatedOrders.length
                  }
                  checked={
                    paginatedOrders.length > 0 &&
                    selectedOrders.length === paginatedOrders.length
                  }
                  onChange={handleSelectAll}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <SortableHeader onClick={() => handleSort("id")}>
                  Order ID
                  {getSortIcon("id")}
                </SortableHeader>
              </TableCell>
              <TableCell>
                <SortableHeader onClick={() => handleSort("user")}>
                  User
                  {getSortIcon("user")}
                </SortableHeader>
              </TableCell>
              <TableCell>
                <SortableHeader onClick={() => handleSort("project")}>
                  Project
                  {getSortIcon("project")}
                </SortableHeader>
              </TableCell>
              <TableCell>
                <SortableHeader onClick={() => handleSort("address")}>
                  Address
                  {getSortIcon("address")}
                </SortableHeader>
              </TableCell>
              <TableCell>Date</TableCell>
              <TableCell>
                <SortableHeader onClick={() => handleSort("status")}>
                  Status
                  {getSortIcon("status")}
                </SortableHeader>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {paginatedOrders.map((order) => (
              <StyledTableRow key={order.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => handleSelectOrder(order.id)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color: theme.palette.text.primary,
                      fontWeight: 500,
                      fontSize: "14px",
                    }}
                  >
                    {order.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <UserContainer>
                    <Avatar
                      src={order.user.avatar}
                      sx={{ width: 24, height: 24 }}
                    >
                      {order.user.name.charAt(0)}
                    </Avatar>
                    <Typography
                      sx={{
                        color: theme.palette.text.primary,
                        fontSize: "14px",
                      }}
                    >
                      {order.user.name}
                    </Typography>
                  </UserContainer>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: "14px",
                    }}
                  >
                    {order.project}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      sx={{
                        color: theme.palette.text.secondary,
                        fontSize: "14px",
                      }}
                    >
                      {order.address}
                    </Typography>
                    {order.address.includes("Olivette") && (
                      <ExternalLink
                        size={14}
                        color={theme.palette.text.disabled}
                      />
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Calendar size={14} color={theme.palette.text.disabled} />
                    <Typography
                      sx={{
                        color: theme.palette.text.secondary,
                        fontSize: "14px",
                      }}
                    >
                      {order.date}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <StatusChip
                    label={order.status}
                    size="small"
                    status={order.status}
                    sx={{
                      fontSize: "12px",
                      fontWeight: 500,
                      height: 24,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small">
                    <MoreHorizontal size={16} />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {totalPages > 1 && (
        <PaginationContainer>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            size="small"
            showFirstButton
            showLastButton
          />
        </PaginationContainer>
      )}

      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
      >
        <MenuItem
          onClick={() => {
            setStatusFilter("all");
            handleFilterClose();
          }}
        >
          All Status
        </MenuItem>
        <MenuItem
          onClick={() => {
            setStatusFilter("Complete");
            handleFilterClose();
          }}
        >
          Complete
        </MenuItem>
        <MenuItem
          onClick={() => {
            setStatusFilter("In Progress");
            handleFilterClose();
          }}
        >
          In Progress
        </MenuItem>
        <MenuItem
          onClick={() => {
            setStatusFilter("Pending");
            handleFilterClose();
          }}
        >
          Pending
        </MenuItem>
        <MenuItem
          onClick={() => {
            setStatusFilter("Approved");
            handleFilterClose();
          }}
        >
          Approved
        </MenuItem>
        <MenuItem
          onClick={() => {
            setStatusFilter("Rejected");
            handleFilterClose();
          }}
        >
          Rejected
        </MenuItem>
      </Menu>

      <Dialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Order</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="User Name"
            value={newOrder.user.name}
            onChange={(e) =>
              setNewOrder({
                ...newOrder,
                user: { ...newOrder.user, name: e.target.value },
              })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Project"
            value={newOrder.project}
            onChange={(e) =>
              setNewOrder({ ...newOrder, project: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Address"
            value={newOrder.address}
            onChange={(e) =>
              setNewOrder({ ...newOrder, address: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={newOrder.status}
              label="Status"
              onChange={(e) =>
                setNewOrder({ ...newOrder, status: e.target.value })
              }
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Complete">Complete</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button
            onClick={handleAddOrder}
            variant="contained"
            disabled={
              !newOrder.user.name || !newOrder.project || !newOrder.address
            }
          >
            Add Order
          </Button>
        </DialogActions>
      </Dialog>
    </OrderCard>
  );
};

export default OrderList;
