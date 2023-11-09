import React from "react";
import { useCookies } from "react-cookie";
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from "react-router-dom";

import "../styles/UserProf.css";
import { FaUserCircle } from "react-icons/fa";

const UserProfile = () => {

  const [cookies, removeCookie] = useCookies([]);
  const _attr = cookies.user;

  const navigate = useNavigate();

  const Logout = () => {
    removeCookie("token");
    removeCookie("user");
    navigate("/login");
  };

  const ChangeName = () => {
    //should update the name from the database
  };

  const ChangePwd = () => {
    //should update the password from the database
  };


  return (
    <div className="navuserProfile">
      <p id="userdisplay">Welcome, {_attr.first_name} {_attr.last_name}</p>
      <div className="usericon">    
      <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic-button"> 
        <FaUserCircle id="userp-icon"/>
      </Dropdown.Toggle>
      <Dropdown.Menu>
         <Dropdown.Item onClick={ChangeName}>Change Name</Dropdown.Item>
        <Dropdown.Item onClick={ChangePwd}>Change Password</Dropdown.Item>
        <Dropdown.Item onClick={Logout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      </div>
    </div>
  );
};

export default UserProfile;