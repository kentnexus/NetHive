import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import Popup from "../helpers/Popup";
import Notification from "../components/Notification";
import "../styles/UserProf.css";
import { FaUserCircle } from "react-icons/fa";
import ChangePasswordForm from "../pages/ChangePasswordForm";
import * as usersService from "../services/usersService";

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

  const Logout = async () => {
    removeCookie("token");
    removeCookie("user");
    setTimeout(() =>{
      navigate("/login");
    }, 1500)
  };

  const addOrEdit = async (user, resetForm) => {
    // console.log("This is Update password condition");
    // setNotify({
    //   isOpen: true,
    //   message: "Update password query required",
    //   type: "error",
    // });
    const userInfo = (({ _id, email, current_password, new_password }) => ({
      _id,
      email,
      current_password,
      new_password,
    }))(user);
    const newRecord = await usersService.patchPassword(userInfo);
    // console.log(newRecord);
    if (newRecord.message == "Incorrect password") {
      setNotify({
        isOpen: true,
        message: "Incorrect Current Password",
        type: "error",
      });
      resetForm();
    } else if (newRecord.message == "New password should NOT be the same as current password.") {
      setNotify({
        isOpen: true,
        message: "New password should NOT be the same as current password.",
        type: "error",
      });
      resetForm();
    } else {
      setNotify({
        isOpen: true,
        message: "Password Updated Successfully",
        type: "success",
      });
      resetForm();
      setOpenPopup(false);
      Logout();
      // navigate("/login");
    }
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
