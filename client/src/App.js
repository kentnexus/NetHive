import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";

// import Landing from "./components/landing.component";
// import Home from "./components/home.component";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Solutions from "./pages/Solutions";
import Users from "./pages/Users";

class App extends Component {
  render() {
    return (
      <div className="header">
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/users" element={<Users />} />
            <Route path="*" element={<div>404 page not found</div>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
