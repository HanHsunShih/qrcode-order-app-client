import "./OrdersPage.scss";
import { getProcessingOrders, changeStatus } from "../../../utils/apiUtils.mjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function OrdersPage() {
  const authToken = localStorage.getItem("authToken");

  const [orders, setOrders] = useState([]);
  const [completedOrderId, setCompletedOrderId] = useState({});

  const ordersRender = async () => {
    try {
      const allOrders = await getProcessingOrders(authToken);
      setOrders(allOrders);

      return allOrders;
    } catch (error) {
      console.error("Error invoking getAllOrders" + error);
    }
  };

  const handleCompleteClick = async (orderID) => {
    try {
      setCompletedOrderId((completedOrderId.order_id = orderID));

      await changeStatus(completedOrderId);

      location.reload();

      return;
    } catch (error) {
      console.log(`Failed invoking fn error: ${error}`);
    }
  };

  useEffect(() => {
    ordersRender();
  }, []);

  function formatIsoDate(isoDate) {
    const date = new Date(isoDate);

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  }

  return (
    <div className="order-page__big-box">
      <main className="order-page">
        <h1 className="order-page__title">Waiting Orders: </h1>
        <Link to="/history">
          <button className="order-page__history-bt">
            <h2 className="order-page__history-bt-text">Order History</h2>
          </button>
        </Link>

        {orders ? (
          orders.map((order) => {
            return (
              <div key={order[0]} className="order-page__box">
                <div className="order-page__box-left">
                  <div className="order-page__box-time">
                    <p className="order-page__box-time-text">
                      table: {order[1][0].table_number}
                    </p>
                    <p className="order-page__box-time-text">
                      ordered time: {formatIsoDate(order[1][0].created_at)}
                    </p>
                  </div>
                  {order[1].map((item, i) => {
                    return (
                      <p className="order-page__product" key={i}>
                        {item.product_name} x {item.quantity}
                      </p>
                    );
                  })}
                </div>
                <button
                  className="order-page__complete-bt"
                  name="status"
                  onClick={() => {
                    handleCompleteClick(order[0]);
                  }}
                >
                  <p className="order-page__complete-bt-text">Complete</p>
                </button>
              </div>
            );
          })
        ) : (
          <p>loading...</p>
        )}
      </main>
    </div>
  );
}
