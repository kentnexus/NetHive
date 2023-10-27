import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import "../styles/LoginPage.css";
const bg = require("../images/bg_nethive.png");

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: toast.POSITION.BOTTOM_LEFT,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div className="form_container"
      style={{
        backgroundColor: "black",
        backgroundImage: `url(${bg})`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <form className="loginform" onSubmit={handleSubmit} >
        <h1
          style={{
            fontFamily: "Jost",
            fontWeight: "6em",
            lineHeight: "normal",
            textAlign: "center"            
          }}
        >
          WELCOME
        </h1>
        <hr />
        <div className="logininput">
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleOnChange}
          />
        </div>
        <div className="logininput">
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleOnChange}
          />
        </div>
        <button className="loginbtn" type="submit">Submit</button>
        <p>
          Don't have an account? Contact your
          <a href="tel:7781234567"> IT Support </a>
        </p>
      </form>
    <ToastContainer/>
    </div>
  );
};

export default Login;
