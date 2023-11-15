import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import Popup from "../helpers/Popup";
import Notification from "../components/Notification";
import "../styles/UserProf.css";
import { FaUserCircle } from "react-icons/fa";
import ChangePasswordForm from "../pages/ChangePasswordForm";
const UserProfile = () => {
  const [cookies, removeCookie] = useCookies([]);
  const _attr = cookies.user;

  const [popupTitle, setPopupTitle] = useState("");

  const [openPopup, setOpenPopup] = useState(false);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const navigate = useNavigate();

  const Logout = () => {
    removeCookie("token");
    removeCookie("user");
    navigate("/login");
  };

  const addOrEdit = async (user, resetForm) => {
    console.log("This is Update password condition");
    setNotify({
      isOpen: true,
      message: "Update password query required",
      type: "error",
    });
    // const newRecord = await usersService.insertUser(user);
    // updateRows(newRecord);
    resetForm();
    setOpenPopup(false);
  };

  return (
    <div className="navuserProfile">
      <p id="userdisplay">
        Welcome, {_attr.first_name} {_attr.last_name}
      </p>
      <div className="usericon">
        <Dropdown className="d-inline mx-2">
          <Dropdown.Toggle variant="secondary" id="dropdown-autoclose-true">
            <FaUserCircle id="userp-icon" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="super-colors">
            <Dropdown.Item
              onClick={() => {
                setPopupTitle("Change Password");
                setOpenPopup(true);
              }}
            >
              Change Password
            </Dropdown.Item>

            <Dropdown.Item onClick={Logout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Popup
          title={popupTitle}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <ChangePasswordForm
            // editRecord={editRecord}
            addOrEdit={addOrEdit}
            popupTitle={popupTitle}
          />
        </Popup>
        <Notification notify={notify} setNotify={setNotify} />
      </div>
    </div>
  );
};

export default UserProfile;
