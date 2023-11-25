import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Button, Form } from "react-bootstrap";
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
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
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
      // console.log(data);
      const { success, message, name } = data;
      if (success) {
        handleSuccess(message);    
        toast(`Welcome, ${name}`, {
          position: "top-right",
        })
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
    // console.clear();
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
      <div>
      <Form className="loginform" onSubmit={handleSubmit} >
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
        <Form.Group  className="logininput">
          <Form.Control 
            as="input" 
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleOnChange}
            required
          />
        </Form.Group>
        <Form.Group className="logininput">
          <Form.Control input
            as="input"
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleOnChange}
            required
          />
        </Form.Group>
        <button id="loginbtn" type="submit">Login</button>
        <p>
          Don't have an account yet, or is your account locked? Contact your
          <a href="tel:7781234567"> IT Support </a>
        </p>
      </Form>
      </div>
    <ToastContainer/>
    
    </div>
  );
};

export default Login;