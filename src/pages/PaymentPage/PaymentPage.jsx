import { Link, useLocation, useNavigate } from "react-router-dom";
import "./PaymentPage.scss";
import { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function Payment({ tableNumber, cartInfo }) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
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
    <div className="payment-page-box">
      <main className="payment-page">
        <Link to="/cart">
          <h3 className="payment-page__back-bt">←</h3>
        </Link>
        <div className="payment-page__price-box">
          <h2 className="payment-page__price-box-text">total price:</h2>
          <h1 className="payment-page__price">{state}</h1>
        </div>
        <div className="payment-page__bt-box">
          <button className="payment-page__pay-bt" onClick={handlePaymentClick}>
            <h3 className="payment-page__pay-bt-text">
              {t("payAtCounterbtn")}
            </h3>
          </button>
          <button className="payment-page__pay-bt">
            <h3 className="payment-page__pay-bt-text">ApplePay</h3>
          </button>
          <button className="payment-page__pay-bt">
            <h3 className="payment-page__pay-bt-text">LinePay</h3>
          </button>
        </div>
        <div className="payment-page__animation-box">
          <iframe
            className="payment-page__animation"
            src="https://lottie.host/embed/3892c20d-dcba-4db0-8715-7cef3b9bc92a/tKNcdNeKK8.lottie"
          ></iframe>
        </div>
      </main>
    </div>
  );
}
