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

function App() {
  const [cartInfo, setCartInfo] = useState(
    JSON.parse(localStorage.getItem("cartInfo")) || []
  );

  const handleAddToCart = (product) => {
    setCartInfo((preCartInfo) => [...preCartInfo, product]);
  };

  const handleCartReset = () => {
    setCartInfo([]);
  };

  useEffect(() => {
    localStorage.setItem("cartInfo", JSON.stringify(cartInfo));
  }, [cartInfo]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
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
            element={<CartPage cartInfo={cartInfo} setCartInfo={setCartInfo} />}
          />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
