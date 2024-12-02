import "./CartPage.scss";
import { Link, useNavigate } from "react-router-dom";

export default function CartPage({ cartInfo, setCartInfo }) {
  const navigate = useNavigate();

  let totalPrice = 0;
  for (let i = 0; i < cartInfo.length; i++) {
    totalPrice += parseFloat(cartInfo[i].price_gbp);
  }
  const formattedTotalPrice = totalPrice.toFixed(2);

  const handlePayClick = (event) => {
    event.preventDefault();

    navigate("/payment", { state: formattedTotalPrice });
  };

  const handleDelete = (indexToDelete) => {
    const updatedCart = cartInfo.filter(
      (pruduct, index) => index !== indexToDelete
    );
    setCartInfo(updatedCart);
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
      <button onClick={handlePayClick}>pay</button>
    </>
  );
}
