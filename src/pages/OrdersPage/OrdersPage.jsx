import "./OrdersPage.scss";
import { getAllOrders } from "../../../utils/apiUtils.mjs";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const ordersRender = async () => {
    try {
      const allOrders = await getAllOrders();
      setOrders(allOrders);
      return allOrders;
    } catch (error) {
      console.error("Error invoking getAllOrders" + error);
    }
  };

  console.log("orders =");
  console.log(orders);

  useEffect(() => {
    ordersRender();
  }, []);

  return (
    <>
      <p>orders waiting: </p>
      {orders ? (
        orders.map((order) => {
          return (
            <>
              <p> {order.table_number} </p>
              <p>{order.product_name}</p>
            </>
          );
        })
      ) : (
        <p>loading...</p>
      )}
    </>
  );
}
