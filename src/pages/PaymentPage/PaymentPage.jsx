import { useLocation, useNavigate } from "react-router-dom";
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

      console.log("orderedProducts = ");
      console.log(orderedProducts);

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

      console.log("newPayLoad = ");
      console.log(newPayLoad);

      const response = await axios.post(`${baseUrl}/api/order`, newPayLoad);

      navigate("/payment-success");
    } catch (error) {
      console.log("🥀Can not post new order: " + error);
    }
  };
  return (
    <main className="payment-page">
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        ←
      </button>
      <p>total price:</p>
      <p>{state}</p>
      <div className="payment-page__bt-box">
        <button>ApplePay</button>
        <button>LinePay</button>
        <button onClick={handlePaymentClick}>Pay At Counter</button>
      </div>
    </main>
  );
}
