import { Link, useNavigate } from "react-router-dom";
import "./HomePage.scss";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function HomePage() {
  const [tableNumber, setTableNumber] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isNaN(tableNumber) || tableNumber < 0 || tableNumber > 20) {
      setErrorMessage("It is not a valid table number😓");
      return;
    }

    // const userId = uuidv4();
    setErrorMessage("");
    navigate(`/menu`);
  };

  const handleTableNumberChange = (event) => {
    setTableNumber(event.target.value);
  };
  return (
    <>
      <main className="home-page__box">
        <div className="home-page__top-box">
          <button className="home-page__top-bt">Admin</button>
        </div>
        <section className="home-page__middle-box">
          <form onSubmit={handleSubmit}>
            <label
              className="home-page__table-number-label"
              name="table_number"
            >
              Enter Table Number
            </label>
            <input
              onChange={handleTableNumberChange}
              className="home-page__table-number"
              name="table_number"
              type="text"
              placeholder="type your table number..."
            />
            {<p> {errorMessage} </p>}
            <button className="home-page__bottom-bt" type="submit">
              Continue
            </button>
          </form>
        </section>
        <section className="home-page__bottom-box">
          <Link to="/menu">
            <h3 className="home-page__bottom-bt">Browse the Menu</h3>
          </Link>
        </section>
      </main>
    </>
  );
}
