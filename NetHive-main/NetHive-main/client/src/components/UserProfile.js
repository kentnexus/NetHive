import React from "react";
import { useCookies } from "react-cookie";
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from "react-router-dom";

import "../styles/UserProf.css";
import { FaUserCircle } from "react-icons/fa";
<<<<<<< HEAD
=======
import { AiFillCaretDown } from "react-icons/ai";
>>>>>>> 59883238015d0fa4438c49a1728aafd60bba83fa

const UserProfile = () => {

  const [cookies, removeCookie] = useCookies([]);
  const _attr = cookies.user;

  const navigate = useNavigate();

  const Logout = () => {
    removeCookie("token");
    removeCookie("user");
    navigate("/login");
  };

<<<<<<< HEAD
  const ChangeName = () => {
    //should update the name from the database
  };

  const ChangePwd = () => {
    //should update the password from the database
  };


=======
>>>>>>> 59883238015d0fa4438c49a1728aafd60bba83fa
  return (
    <div className="navuserProfile">
      <p id="userdisplay">Welcome, {_attr.first_name} {_attr.last_name}</p>
      <div className="usericon">    
      <Dropdown>
<<<<<<< HEAD
      <Dropdown.Toggle variant="secondary" id="dropdown-basic-button"> 
        <FaUserCircle id="userp-icon"/>
      </Dropdown.Toggle>
      <Dropdown.Menu>
         <Dropdown.Item onClick={ChangeName}>Change Name</Dropdown.Item>
        <Dropdown.Item onClick={ChangePwd}>Change Password</Dropdown.Item>
=======

      <Dropdown.Toggle>
        <FaUserCircle id="userp-icon"/>
      </Dropdown.Toggle>
      <Dropdown.Menu>
>>>>>>> 59883238015d0fa4438c49a1728aafd60bba83fa
        <Dropdown.Item onClick={Logout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      </div>
    </div>
  );
};

export default UserProfile;
