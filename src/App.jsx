import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" />
          <Route path="/menu/:product_id" />
          <Route path="/cart/:customer_id" />
          <Route path="/order" />
          <Route path="/order/:customer_id" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
