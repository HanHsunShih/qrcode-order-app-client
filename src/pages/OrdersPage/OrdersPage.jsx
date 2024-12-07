import "./OrdersPage.scss";
import { getProcessingOrders, changeStatus } from "../../../utils/apiUtils.mjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function OrdersPage() {
  const authToken = localStorage.getItem("authToken");

  const [orders, setOrders] = useState([]);
  const [completedOrderId, setCompletedOrderId] = useState({});

  const ordersRender = async (authToken) => {
    try {
      const allOrders = await getProcessingOrders(authToken);
      setOrders(allOrders);
      return allOrders;
    } catch (error) {
      console.error("Error invoking getAllOrders" + error);
    }
  };

  const handleClick = async (orderID) => {
    try {
      console.log("🥰");
      setCompletedOrderId((completedOrderId.order_id = orderID));

      await changeStatus(completedOrderId);
      ordersRender();

      return;
    } catch (error) {
      console.log(`Failed invoking fn error: ${error}`);
    }
  };

  useEffect(() => {
    ordersRender();
  }, []);

  return (
    <main className="order-page">
      <p>orders waiting: </p>
      <Link to="/history">
        <button>Order History</button>
      </Link>

      {orders ? (
        orders.map((order) => {
          return (
            <div key={order[0]} className="order-page__box">
              <p>order Id: {order[0]}</p>
              {order[1].map((item, i) => {
                return (
                  <p key={i}>
                    {item.product_name} x {item.quantity}
                  </p>
                );
              })}
              <button
                name="status"
                onClick={() => {
                  handleClick(order[0]);
                }}
              >
                Complete
              </button>
            </div>
          );
        })
      ) : (
        <p>loading...</p>
      )}
    </main>
  );
}
