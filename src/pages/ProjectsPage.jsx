import React from "react";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import OrderList from "../components/OrderList";

const ProjectsPage = () => {
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Projects</Typography>
        <Button variant="contained" color="primary">
          New Project
        </Button>
      </Box>
      <Typography variant="body1" color="text.secondary" paragraph>
        Manage your projects and track their progress.
      </Typography>

      <OrderList />
    </Container>
  );
};

export default ProjectsPage;
