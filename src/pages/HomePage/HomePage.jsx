import "./HomePage.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Login from "../../components/Login/Login";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import turtlePoster from "../../assets/media/home-page-poster-seaturtle.png";
import turtleVideo from "../../assets/media/home-page-video-seaturtle.mp4";
// import "../../../public/locales/ch";
// import "../../../public/locales/en";

import SignUp from "../../components/SignUp/SignUp";
import turtleGif from "../../assets/media/home-page-video-seaturtle.gif";

export default function HomePage({ tableNumber, setTableNumber }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState("");
  const [adminPopUp, setAdminPopUp] = useState(false);
  const [lanStatus, setLanStatus] = useState("ch");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isNaN(tableNumber) || tableNumber < 0 || tableNumber > 20) {
      setErrorMessage("It is not a valid table number😓");
      return;
    }

    setErrorMessage("");
    navigate(`/menu`, { state: { language: { lanStatus } } });
  };

  const handleLogIn = () => {
    setAdminPopUp(!adminPopUp);
  };

  const handleTableNumberChange = (event) => {
    setTableNumber(event.target.value);
  };

  const handleCancelLogIn = () => {
    setAdminPopUp(false);
  };

  const handleNavToMenu = () => {
    navigate(`/menu`, { state: { lanStatus } });
  };

  console.log("lanStatus: ");
  console.log(lanStatus);

  //, { state: { lanStatue } }

  return (
    <section className="home-page">
      {/* <SignUp /> */}
      {adminPopUp && <Login handleCancelLogIn={handleCancelLogIn} />}
      <main className="home-page__box">
        <video
          className="home-page__bg-video"
          loop={true}
          muted={true}
          autoPlay={true}
          playsInline={true}
          poster={turtlePoster}
        >
          <source src={turtleVideo} type="video/mp4" />
        </video>
        {/* <iframe className="home-page__bg-video" src={turtleGif}></iframe> */}
        <div className="home-page__admin-box">
          <LanguageSelector setLanStatus={setLanStatus} />
          <button className="home-page__top-bt" onClick={handleLogIn}>
            <p>{t("login")}</p>
          </button>
        </div>
        <section>
          <form onSubmit={handleSubmit} className="home-page__middle-box">
            <input
              onChange={handleTableNumberChange}
              className="home-page__table-number"
              name="table_number"
              type="text"
              placeholder={t("tableNumber")}
            />
            {errorMessage && <p> {errorMessage} </p>}
            <button className="home-page__bottom-bt" type="submit">
              {t("continueBt")}
            </button>
          </form>
        </section>
        <section className="home-page__bottom-box">
          <button onClick={handleNavToMenu} className="home-page__bottom-bt">
            <p className="home-page__bottom-bt">{t("browseMenuBt")}</p>
          </button>
        </section>
      </main>
    </section>
  );
}
