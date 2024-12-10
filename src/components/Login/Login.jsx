import { useState } from "react";
import "./Login.scss";
import { login } from "../../../utils/apiUtils.mjs";
import { useNavigate } from "react-router-dom";

export default function Login({ handleCancelLogIn }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submitForm = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.password) {
      setErrorMessage("You must provide a username and a password");
    }

    try {
      const loginData = {
        name: formData.name,
        password: formData.password,
      };
      const { data } = await login(loginData);

      localStorage.setItem("authToken", data.authToken);

      navigate("/orders");
    } catch (error) {
      console.log("Error login, error: " + error);
    }
  };

  return (
    <section className="login">
      <h1 className="login__title">Login</h1>
      <form className="login__form-box" onSubmit={submitForm}>
        <div className="login__form-box-samll">
          <label htmlFor="name">
            <h2 className="login__form-label">user name:</h2>
          </label>
          <input
            className="login__form-input"
            type="text"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="login__form-box-samll">
          <label htmlFor="password">
            <h2 className="login__form-label">password:</h2>
          </label>
          <input
            className="login__form-input"
            type="text"
            name="password"
            onChange={handleChange}
          />
        </div>
        {errorMessage && <p className="login__form-message">{errorMessage}</p>}
        <div>
          <button className="login__form-bt">
            <h3>Login</h3>
          </button>
          <button className="login__form-bt" onClick={handleCancelLogIn}>
            <h3>Cancel</h3>
          </button>
        </div>
      </form>
    </section>
  );
}
