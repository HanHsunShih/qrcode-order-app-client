import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPage.scss";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handlePaymentClick = (event) => {
    event.preventDefault();
    navigate("/paymentSuccess");
  };
  return (
    <>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        ←
      </button>
      <p>total price:</p>
      <p>{state}</p>
      <div className="payment-page__bt-box">
        <button>ApplePay</button>
        <button>LinePay</button>
        <button onClick={handlePaymentClick}>Pay At Counter</button>
      </div>
    </>
  );
}
