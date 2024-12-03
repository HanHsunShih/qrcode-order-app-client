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
    // post request to /api/order
    // payload/request body: { table_number: 5, products: [{}, {}]}
    try {
      const response = await axios.post(`${baseUrl}/api/order`, payload);
      console.log(payload);
      navigate("/payment-success");
    } catch (error) {
      console.log("Can not post new order: " + error);
    }
  };
  return (
    <>
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
    </>
  );
}
