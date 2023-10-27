import React, { Component } from "react";
import { Route, Routes, Navigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import {Provider} from "react-redux";
import store from "./store";

import Login from "./pages/Login";
import Home from "./pages/Home";


const bg = require("./images/yellow_abstract_bg.jpg");


// Check for token to keep user logged in
if (sessionStorage.jwtToken) {
  // Set auth token header auth
  const token = sessionStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function PrivateRoute({children}) {
  const auth = setAuthToken();
  return auth ? children : <Navigate to="/login" />;
}

class App extends Component {

  render() {
    return (
      <Provider store={store}>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} /> 
          {/* <Route path="*" element={<NotFound />} /> */}
          {/* <Route path="/home" element={<Home />} />  */}
          {/* <Route path="/" element={
            <PrivateRoute component={<Home />} />
          }
        /> */}
        <Route path="/home" element={
          <PrivateRoute>
          <Home />
          </PrivateRoute>
        }
        />
      </Routes>
        <div className="container mt-3"></div>
    </div>
      </Provider>
    );
  }
}

export default App;