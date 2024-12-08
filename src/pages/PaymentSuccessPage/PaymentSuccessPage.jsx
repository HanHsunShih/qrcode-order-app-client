import "./PaymentSuccessPage.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import cavePoster from "../../assets/media/home-page-poster-cave.png";
import caveVideo from "../../assets/media/home-page-video-cave.mov";

export default function PaymentSuccessPage({ setCartInfo }) {
  const navigate = useNavigate();

  const handleCartReset = () => {
    setCartInfo([]);
  };
  return (
    <main className="payment-success-page">
      <video
        muted
        className="home-page__bg-video"
        autoPlay
        loop
        poster={cavePoster}
        controls
      >
        <source src={caveVideo} type="video/mp4" />
      </video>
      {/* <Link to="/menu ">
        <h3 className="payment-success-page__back-bt">←</h3>
      </Link> */}
      <div className="payment-success-page__box">
        <h3 className="payment-success-page__message">
          Your payment is Success🎉
        </h3>
        <button
          className="payment-success-page__home-bt"
          onClick={() => {
            navigate("/menu");
            handleCartReset();
          }}
        >
          <h3>Back to home page</h3>
        </button>
      </div>
    </main>
  );
}
