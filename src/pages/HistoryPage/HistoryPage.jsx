import "./HistoryPage.scss";
import { Link } from "react-router-dom";
import { getCompletedOrders } from "../../../utils/apiUtils.mjs";
import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [completedOrders, setCompletedOrders] = useState([]);

  const orderRender = async () => {
    try {
      const allOrders = await getCompletedOrders();

      setCompletedOrders(allOrders);
      return allOrders;
    } catch (error) {
      console.error("🎄Error invoking getCompletedOrders" + error);
    }
  };

  useEffect(() => {
    orderRender();
  }, []);

  return (
    <main className="order-history">
      <Link to={-1}>
        <button>←</button>
      </Link>
      <p>Order History:</p>

      {completedOrders ? (
        completedOrders.map((completedOrder) => {
          return (
            <section key={completedOrder[0]} className="order-history__box">
              <div className="order-box">
                <p>order Id: {completedOrder[0]}</p>
                {completedOrder[1].map((item, i) => {
                  return (
                    <p key={i}>
                      {item.product_name} x {item.quantity}
                    </p>
                  );
                })}
              </div>
            </section>
          );
        })
      ) : (
        <p>loading...</p>
      )}
    </main>
  );
}
