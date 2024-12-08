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
      <Link to={-1} className="order-history__back-bt">
        <h3>←</h3>
      </Link>
      <h1 className="order-history__title">Order History:</h1>

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
