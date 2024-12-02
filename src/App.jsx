import { useState } from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MenuPage from "./pages/MenuPage/MenuPage";
import SingleProductPage from "./pages/SingleProductPage/SingleProductPage";
import CartPage from "./pages/CartPage/CartPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage/PaymentSuccessPage";

function App() {
  const [cartInfo, setCartInfo] = useState([]);

  const handleAddToCart = (product) => {
    setCartInfo((preCartInfo) => [...preCartInfo, product]);
  };

  const handleCartReset = () => {
    setCartInfo([]);
  };

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
            path="/menu/:userId"
            element={
              <MenuPage
                handleAddToCart={handleAddToCart}
                cartInfo={cartInfo}
                handleCartReset={handleCartReset}
              />
            }
          />
          <Route
            path="/menu/:userId/:product_id"
            element={
              <SingleProductPage
                cartInfo={cartInfo}
                setCartInfo={setCartInfo}
              />
            }
          />
          <Route
            path="/cart/:userId"
            element={<CartPage cartInfo={cartInfo} setCartInfo={setCartInfo} />}
          />
          <Route path="/order" />
          <Route path="/order/:userId" />
          <Route path="/payment/:userId" element={<PaymentPage />} />
          <Route path="/paymentSuccess" element={<PaymentSuccessPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
