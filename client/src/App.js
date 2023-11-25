import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Solutions from "./pages/Solutions";
import Users from "./pages/Users";

const App = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [first_name, setUsername] = useState("");
  
  const removeCookies = () => {
    removeCookie("token");
    removeCookie("user");
  }

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      // if (cookies.token && window.location.pathname == "/login"){
        // removeCookies();
        // navigate("/");
      // }
      const { data } = await axios.post(
        "http://localhost:3000/",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? true
        : (removeCookies(), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  // console.clear();

  return (
    
    <div className="header">
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/users" element={<Users />} />
          <Route path="*" element={<div>404 page not found</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
