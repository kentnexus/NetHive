import React from "react";
const bg = require("../images/bg_nethive.png");
import { Button, Form } from "react-bootstrap";
import "../styles/LoginPage.css";
import Home from "./Home";
import { Link, Navigate } from "react-router-dom";
import MainPageLayout from "../components/MainPageLayout";

const Login = () => {
  const handleSubmit = (event) => {
    return event.preventDefault();
    console.log('You clicked submit.');
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        backgroundImage: `url(${bg})`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* <Card > */}
      <Form className="loginform">
        <h1
          style={{
            fontFamily: "Jost",
            fontWeight: "6em",
            lineHeight: "normal",
            textAlign: "center",
          }}
        >
          WELCOME
        </h1>
        <hr />
        <Form.Group className="logininput">
          <Form.Control as="input" placeholder="Username" required />
        </Form.Group>
        <Form.Group className="logininput">
          <Form.Control as="input" placeholder="Password" required />
        </Form.Group>
        <Button className="loginbtn" type="submit" 
        onClick={handleSubmit}
        >
          Login
        </Button>
        <p>
          Don't have an account? Contact your{" "}
          <a href="tel:7781234567"> IT Support </a>
        </p>
      </Form>
      {/* </Card> */}
    </div>
  );
};

export default Login;
