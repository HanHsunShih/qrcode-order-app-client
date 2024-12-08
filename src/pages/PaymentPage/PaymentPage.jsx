import { Link, useLocation, useNavigate } from "react-router-dom";
import "./PaymentPage.scss";
import { useState } from "react";
import axios from "axios";

export default function Payment({ tableNumber, cartInfo }) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_SERVER_URL;

  const payload = {
    table_number: tableNumber,
    products: cartInfo,
  };

  const handlePaymentClick = async () => {
    try {
      const itemCounts = {};
      const orderedProducts = payload.products;

      const result = orderedProducts.reduce((accumulator, currentProduct) => {
        const existingProduct = accumulator.find(
          (item) => item.id === currentProduct.id
        );

        if (!existingProduct) {
          accumulator.push({ ...currentProduct, quantity: 1 });
        } else {
          existingProduct.quantity++;
        }

        return accumulator;
      }, []);

      const newPayLoad = { ...payload, products: result };

      const response = await axios.post(`${baseUrl}/api/order`, newPayLoad);

      navigate("/payment-success");
    } catch (error) {
      console.log("🥀Can not post new order: " + error);
    }
  };
  return (
    <main className="payment-page">
      <Link to="/cart">
        <h3 className="payment-page__back-bt">←</h3>
      </Link>
      <div className="payment-page__price-box">
        <h1>total price:</h1>
        <h1>{state}</h1>
      </div>
      <div className="payment-page__bt-box">
        <button className="payment-page__pay-bt">
          <h3>ApplePay</h3>
        </button>
        <button className="payment-page__pay-bt">
          <h3>LinePay</h3>
        </button>
        <button className="payment-page__pay-bt" onClick={handlePaymentClick}>
          <h3>Pay At Counter</h3>
        </button>
      </div>
    </main>
  );
}
