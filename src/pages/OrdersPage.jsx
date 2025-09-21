import { Container } from "@mui/material";
import OrderList from "../components/OrderList";

const OrdersPage = () => {
  return (
    <Container maxWidth="xl">
      <OrderList />
    </Container>
  );
};

export default OrdersPage;
