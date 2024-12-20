import { useState, useEffect } from "react";
import "./CartPage.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function CartPage({
  cartInfo,
  setCartInfo,
  tableNumber,
  setTableNumber,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [tableMessage, setTableMessage] = useState("");
  const [showTableInput, setShowTableInput] = useState(false);
  const [paymentMessage, setPaymentessage] = useState("");
  const scrollPosition = location.state?.scrollPosition || 0;

  let totalPrice = 0;
  for (let i = 0; i < cartInfo.length; i++) {
    totalPrice += parseFloat(cartInfo[i].price_gbp);
  }
  const formattedTotalPrice = totalPrice.toFixed(2);

  const handlePayClick = () => {
    if (formattedTotalPrice === "0.00") {
      setPaymentessage("You haven't order anything yet 😳");
      return;
    } else if (tableNumber === "") {
      setTableMessage("Please enter your table number 🥪");
      setShowTableInput(true);
      return;
    } else if (isNaN(tableNumber) || tableNumber < 0 || tableNumber > 20) {
      setTableMessage("Please enter the right table number ☕️");
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

  const handleGoBack = () => {
    navigate("/menu", { state: scrollPosition });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cart-page__big-box">
      <main className="cart-page">
        <div className="cart-page__animation-box">
          <iframe
            className="cart-page__animation"
            src="https://lottie.host/embed/7a203e77-1382-4000-86d0-5d57e5d52723/3AKtCYFLwz.lottie"
          ></iframe>
        </div>
        <button onClick={handleGoBack} className="cart-page__bt">
          <h3 className="cart-page__bt-text">←</h3>
        </button>
        <div className="cart-page__box">
          <h1 className="cart-page__title">Your Cart</h1>
          {cartInfo.map((item, index) => {
            return (
              <div key={index} className="cart-page__box-small">
                <div className="cart-page__box-left">
                  <h3 className="cart-page__product">{item.product_name}</h3>
                  <p className="cart-page__price">£ {item.price_gbp}</p>
                </div>
                <button
                  className="cart-page__bt cart-page__bt-delete"
                  onClick={() => handleDelete(index)}
                >
                  <h3 className="cart-page__delete">Delete</h3>
                </button>
              </div>
            );
          })}
          <p className="cart-page__total-price">total price</p>
          <p className="cart-page__text">£ {formattedTotalPrice}</p>
          {showTableInput && (
            <input
              type="number"
              value={tableNumber}
              onChange={handleTableNumberChange}
              className="cart-page__table-number-input"
            ></input>
          )}
          {tableMessage && <p className="cart-page__message">{tableMessage}</p>}
          {paymentMessage && (
            <p className="cart-page__message">{paymentMessage}</p>
          )}
          <button
            className="cart-page__bt cart-page__bt-pay"
            onClick={handlePayClick}
          >
            <h2 className="cart-page__pay-bt">Pay</h2>
          </button>
        </div>
      </main>
    </div>
  );
}
