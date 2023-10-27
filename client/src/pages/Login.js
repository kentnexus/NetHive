import React, { Component, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";


import "../styles/LoginPage.css";
import { Navigate, Route, Routes} from "react-router-dom";

const bg = require("../images/yellow_abstract_bg.jpg");

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email:"",
      password: "",
      readyToRedirect: false,
      errors: {}
    };
}

componentDidMount = () => {

  console.log('componentDidMount')
  if (this.props.auth.isAuthenticated) {
    <Route path="*" element={() => <Navigate to="/home" />} />
  }
}

UNSAFE_componentWillReceiveProps = (nextProps) => {

  console.log('componentWillReceiveProps')
  if (nextProps.auth.isAuthenticated) {
    <Route path="*" element={() => <Navigate to="/hpme" />} />
  }

  if (nextProps.errors) {
    this.setState({
      errors: nextProps.errors
    });
  }
}

onChange = async e => {
  this.setState({ [e.target.id]: e.target.value });
};

onSubmit = async e => {
  e.preventDefault();
  const userData = {
      email: this.state.email,
      password: this.state.password
    };
  
    
  this.props.loginUser(userData);
};

render() {

  const { errors } = this.state;
  // console.log(this.state.readyToRedirect);

  // if (this.state.readyToRedirect) {
  //   return <Navigate to="/" />
  // }

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

      <Form className="loginform" onSubmit={this.onSubmit}>
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
        <Form.Group className="logininput" >
          <Form.Control onChange={this.onChange} id="email" type="input" placeholder="Email" required 
          >
          </Form.Control>
        </Form.Group>
        <Form.Group className="logininput">
          <Form.Control onChange={this.onChange} id="password" type="password"  placeholder="Password" required 
          >
          </Form.Control>    
        </Form.Group>
        <Button className="loginbtn" type="submit">
          Login
        </Button>
        <p>
          Don't have an account? Contact your{" "}
          <a href="tel:7781234567"> IT Support </a>
        </p>
      </Form>
    </div>
  );
};
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);