import { useEffect, useState } from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MenuPage from "./pages/MenuPage/MenuPage";
import SingleProductPage from "./pages/SingleProductPage/SingleProductPage";
import CartPage from "./pages/CartPage/CartPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage/PaymentSuccessPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import { useTranslation } from "react-i18next";

function App() {
  const [cartInfo, setCartInfo] = useState(
    JSON.parse(localStorage.getItem("cartInfo")) || []
  );
  const [tableNumber, setTableNumber] = useState("");
  const { i18n } = useTranslation();
  const preferLan = localStorage.getItem("lanPre");

  const handleAddToCart = (product) => {
    setCartInfo((preCartInfo) => [...preCartInfo, product]);
  };

  const handleCartReset = () => {
    setCartInfo([]);
    setTableNumber("");
  };

  useEffect(() => {
    i18n.changeLanguage(preferLan);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartInfo", JSON.stringify(cartInfo));
  }, [cartInfo]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                tableNumber={tableNumber}
                setTableNumber={setTableNumber}
              />
            }
          />
          <Route
            path="/menu"
            element={
              <MenuPage
                handleAddToCart={handleAddToCart}
                cartInfo={cartInfo}
                handleCartReset={handleCartReset}
              />
            }
          />
          <Route
            path="/menu/:product_id"
            element={
              <SingleProductPage
                cartInfo={cartInfo}
                setCartInfo={setCartInfo}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cartInfo={cartInfo}
                setCartInfo={setCartInfo}
                tableNumber={tableNumber}
                setTableNumber={setTableNumber}
              />
            }
          />
          <Route
            path="/payment"
            element={
              <PaymentPage tableNumber={tableNumber} cartInfo={cartInfo} />
            }
          />
          <Route
            path="/payment-success"
            element={<PaymentSuccessPage setCartInfo={setCartInfo} />}
          />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
