import { useNavigate } from "react-router-dom";
import "./PaymentSuccessPage.scss";

export default function PaymentSuccessPage() {
  const navigate = useNavigate();

  const handleCartReset = () => {
    setCartInfo([]);
    setTableNumber("");
  };
  return (
    <main className="payment-success-page">
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        ←
      </button>
      <p>Your payment is Success</p>
      <button
        onClick={() => {
          navigate("/menu");
          handleCartReset();
        }}
      >
        Back to home page
      </button>
    </main>
  );
}
