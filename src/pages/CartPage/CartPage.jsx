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
  const [tableMessage, setTableMessage] = useState("");
  const [showTableInput, setShowTableInput] = useState(false);
  const [paymentMessage, setPaymentessage] = useState("");

  let totalPrice = 0;
  for (let i = 0; i < cartInfo.length; i++) {
    totalPrice += parseFloat(cartInfo[i].price_gbp);
  }
  const formattedTotalPrice = totalPrice.toFixed(2);

  const handlePayClick = () => {
    if (formattedTotalPrice === "0.00") {
      setPaymentessage("You haven't order anything😳");
      return;
    } else if (tableNumber === "") {
      setTableMessage("Please enter your table number🍽️");
      setShowTableInput(true);
      return;
    } else if (isNaN(tableNumber) || tableNumber < 0 || tableNumber > 20) {
      setTableMessage("Please enter the right table number🍽️");
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
    setTableMessage("");
    setTableNumber(event.target.value);
  };

  return (
    <main className="cart-page">
      <Link to="/menu" className="cart-page__bt">
        <h3>←</h3>
      </Link>
      <div className="cart-page__box">
        <h1 className="cart-page__title">Your Cart</h1>
        {cartInfo.map((item, index) => {
          return (
            <div key={index} className="cart-page__box-small">
              <div className="cart-page__box-left">
                <h3>{item.product_name}</h3>
                <p>£ {item.price_gbp}</p>
              </div>
              <button
                className="cart-page__bt"
                onClick={() => handleDelete(index)}
              >
                <h3>Delete</h3>
              </button>
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
            className="cart-page__table-number-input"
          ></input>
        )}
        {tableMessage && <p>{tableMessage}</p>}
        {paymentMessage && <p>{paymentMessage}</p>}
        <button
          className="cart-page__bt cart-page__bt-pay"
          onClick={handlePayClick}
        >
          <h3>Pay</h3>
        </button>
      </div>
    </main>
  );
}
