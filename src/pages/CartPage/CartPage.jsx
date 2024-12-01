import "./CartPage.scss";
import { useLocation, useNavigate } from "react-router-dom";

export default function CartPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const cartProductsInfo = state?.cartInfo || [];

  let totalPrice = 0;
  for (let i = 0; i < cartProductsInfo.length; i++) {
    totalPrice += cartProductsInfo[i].price_gbp;
  }

  return (
    <>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        ←
      </button>
      <p>Your Order</p>
      {cartProductsInfo.map((cartProductInfo, index) => {
        return (
          <div key={index}>
            <p>{cartProductInfo.product_name}</p>
            <p>{cartProductInfo.price_gbp}</p>
          </div>
        );
      })}
      <p>total price</p>
      <p>{totalPrice}</p>
      <button>pay</button>
    </>
  );
}
