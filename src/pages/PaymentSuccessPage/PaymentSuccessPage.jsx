import "./PaymentSuccessPage.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import cavePoster from "../../assets/media/home-page-poster-cave.png";
import caveVideo from "../../assets/media/home-page-video-cave.mov";
import { useTranslation } from "react-i18next";

export default function PaymentSuccessPage({ setCartInfo }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCartReset = () => {
    setCartInfo([]);
  };
  return (
    <main className="payment-success-page">
      <div className="payment-success-page__animetion-box">
        <iframe
          className="payment-success-page__animetion-ribbon"
          src="https://lottie.host/embed/12bd8988-081b-4ca2-82d1-7884afe3d939/Fbd5DUNcvF.lottie?loop=false&autoplay=true&controls=false"
          title="Lottie Animation"
        ></iframe>
      </div>
      <video
        muted
        className="home-page__bg-video"
        autoPlay
        loop
        poster={cavePoster}
      >
        <source src={caveVideo} type="video/mp4" />
      </video>
      {/* <Link to="/menu ">
        <h3 className="payment-success-page__back-bt">←</h3>
      </Link> */}
      <div className="payment-success-page__box">
        <h3 className="payment-success-page__message">
          {t("paymentSucceed")}🎉
        </h3>
        <button
          className="payment-success-page__home-bt"
          onClick={() => {
            navigate("/menu");
            handleCartReset();
          }}
        >
          <h3 className="payment-success-page__home-bt">
            {t("backToMenuPageBtn")}
          </h3>
        </button>
      </div>
    </main>
  );
}
