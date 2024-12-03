import { useState } from "react";
import "./CartPage.scss";
import { Link, useNavigate } from "react-router-dom";

export default function CartPage({
  cartInfo,
  setCartInfo,
  tableNumber,
  setTableNumber,
}) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showTableInput, setShowTableInput] = useState(false);

  let totalPrice = 0;
  for (let i = 0; i < cartInfo.length; i++) {
    totalPrice += parseFloat(cartInfo[i].price_gbp);
  }
  const formattedTotalPrice = totalPrice.toFixed(2);

  const handlePayClick = () => {
    if (tableNumber === "") {
      setMessage("Please enter your table number");
      setShowTableInput(true);
      return;
    } else if (isNaN(tableNumber) || tableNumber < 0 || tableNumber > 20) {
      setMessage("Please enter your table number");
      setShowTableInput(true);
      return;
    }
    navigate("/payment", { state: formattedTotalPrice });
  };

  const handleDelete = (indexToDelete) => {
    const updatedCart = cartInfo.filter(
      (pruduct, index) => index !== indexToDelete
    );
    setCartInfo(updatedCart);
  };

  const handleTableNumberChange = (event) => {
    setMessage("");
    setTableNumber(event.target.value);
  };

  return (
    <>
      <Link to={-1}>←</Link>
      <p>Your Order</p>
      {cartInfo.map((item, index) => {
        return (
          <div key={index} className="cart-page__box">
            <div className="cart-page__box-left">
              <p>{item.product_name}</p>
              <p>{item.price_gbp}</p>
            </div>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        );
      })}
      <p>total price</p>
      <p>£ {formattedTotalPrice}</p>
      {showTableInput && (
        <input
          type="number"
          value={tableNumber}
          onChange={handleTableNumberChange}
        ></input>
      )}
      {message && <p>{message}</p>}
      <button onClick={handlePayClick}>pay</button>
    </>
  );
}
