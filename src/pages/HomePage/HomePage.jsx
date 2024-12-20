import { Link, useNavigate } from "react-router-dom";
import "./HomePage.scss";
import { useState } from "react";
import turtlePoster from "../../assets/media/home-page-poster-seaturtle.png";
import turtleVideo from "../../assets/media/home-page-video-seaturtle.mp4";
import Login from "../../components/Login/Login";
import SignUp from "../../components/SignUp/SignUp";
import turtleGif from "../../assets/media/home-page-video-seaturtle.gif";

export default function HomePage({ tableNumber, setTableNumber }) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [adminPopUp, setAdminPopUp] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isNaN(tableNumber) || tableNumber < 0 || tableNumber > 20) {
      setErrorMessage("It is not a valid table number😓");
      return;
    }

    setErrorMessage("");
    navigate(`/menu`);
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
          <button className="home-page__top-bt" onClick={handleLogIn}>
            <p>Admin</p>
          </button>
        </div>
        <section>
          <form onSubmit={handleSubmit} className="home-page__middle-box">
            <input
              onChange={handleTableNumberChange}
              className="home-page__table-number"
              name="table_number"
              type="text"
              placeholder="enter table number..."
            />
            {errorMessage && <p> {errorMessage} </p>}
            <button className="home-page__bottom-bt" type="submit">
              Continue
            </button>
          </form>
        </section>
        <section className="home-page__bottom-box">
          <Link to="/menu" className="home-page__bottom-bt">
            <h2>Browse the Menu</h2>
          </Link>
        </section>
      </main>
    </section>
  );
}
