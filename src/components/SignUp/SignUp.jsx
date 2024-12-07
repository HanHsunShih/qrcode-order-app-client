import { useState } from "react";
import "./SignUp.scss";
import { creatNewUser } from "../../../utils/apiUtils.mjs";

export default function SignUp() {
  const [nameData, setNameData] = useState("");
  const [passwordData, setPassWordData] = useState("");

  const handleNameChange = (event) => {
    setNameData(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassWordData(event.target.value);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const userData = {
      name: nameData,
      password: passwordData,
    };
    try {
      await creatNewUser(userData);
    } catch (error) {
      console.log("error creating new user, error: " + error);
    }
  };

  return (
    <>
      <p>sign up</p>
      <form onSubmit={submitForm}>
        <label htmlFor="name">user name:</label>
        <input
          type="text"
          name="name"
          value={nameData}
          onChange={handleNameChange}
        />
        <label htmlFor="password">password:</label>
        <input
          type="text"
          name="password"
          value={passwordData}
          onChange={handlePasswordChange}
        />
        <button>sign up</button>
      </form>
    </>
  );
}
