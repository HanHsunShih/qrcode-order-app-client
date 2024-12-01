import { useState } from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MenuPage from "./pages/MenuPage/MenuPage";
import SingleProductPage from "./pages/SingleProductPage/SingleProductPage";
import CartPage from "./pages/CartPage/CartPage";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [cartInfo, setCartInfo] = useState([]);

  const handleAddToCart = (product) => {
    setCartCount(cartCount + 1);
    setCartInfo((preCartInfo) => [...preCartInfo, product]);
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
                // handleNavigateToCart={handleNavigateToCart}
                cartCount={cartCount}
                cartInfo={cartInfo}
              />
            }
          />
          <Route
            path="/menu/:userId"
            element={
              <MenuPage
                handleAddToCart={handleAddToCart}
                // handleNavigateToCart={handleNavigateToCart}
                cartCount={cartCount}
                cartInfo={cartInfo}
              />
            }
          />
          <Route
            path="/menu/:userId/:product_id"
            element={<SingleProductPage />}
          />
          <Route path="/cart/:userId" element={<CartPage />} />
          <Route path="/order" />
          <Route path="/order/:userId" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
