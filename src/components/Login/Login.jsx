import { useState } from "react";
import "./Login.scss";
import { login } from "../../../utils/apiUtils.mjs";
import { useNavigate } from "react-router-dom";

export default function Login() {
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
      // setErrorMessage("Error login, error: " + error);
    }
  };

  return (
    <>
      <p>Login</p>
      <form onSubmit={submitForm}>
        <label htmlFor="name">user name:</label>
        <input type="text" name="name" onChange={handleChange} />
        <label htmlFor="password">password:</label>
        <input type="text" name="password" onChange={handleChange} />
        {errorMessage && <p>{errorMessage}</p>}
        <button>Login</button>
      </form>
    </>
  );
}
