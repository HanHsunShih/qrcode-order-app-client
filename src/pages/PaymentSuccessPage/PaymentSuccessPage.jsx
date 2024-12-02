import { useNavigate } from "react-router-dom";
import "./PaymentSuccessPage.scss";

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  return (
    <>
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
        }}
      >
        Back to home page
      </button>
    </>
  );
}
