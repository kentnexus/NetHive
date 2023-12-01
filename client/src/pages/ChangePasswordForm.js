import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Controls from "../helpers/Controls";
import { useForm, Form } from "../hooks/useForm";
import * as usersService from "../services/usersService";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const initialValues = {
  current_password: "",
  new_password: "",
  confirm_new: "",
};

const ChangePasswordForm = (props) => {
  const { editRecord, popupTitle, addOrEdit } = props;
  // const [isEdit, setIsEdit] = useState(false);
  const [cookies, removeCookie] = useCookies([]);
  const _attr = cookies.user;

  // const navigate = useNavigate();

  // const [notify, setNotify] = useState({
  //   isOpen: false,
  //   message: "",
  //   type: "",
  // });

  // const addOrEdit = async (user, resetForm) => {
  //   const userInfo = (({ _id, email, current_password, new_password }) => ({
  //     _id,
  //     email,
  //     current_password,
  //     new_password,
  //   }))(user);
  //   const newRecord = await usersService.patchPassword(userInfo);
  //   console.log(newRecord);
  //   setNotify({
  //     isOpen: true,
  //     message: "Updated Successfully",
  //     type: "success",
  //   });
  //   removeCookie("token");
  //   removeCookie("user");
  //   navigate("/login");
  // };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("current_password" in fieldValues)
      temp.current_password = fieldValues.current_password
        ? ""
        : "This field is required";
    if ("new_password" in fieldValues)
      temp.new_password = fieldValues.new_password
        ? ""
        : "This field is required";
    if ("confirm_new" in fieldValues)
      temp.confirm_new =
        fieldValues.confirm_new === values.new_password
          ? ""
          : "Password does not match";
    setErrors({ ...temp });

    // console.log(temp);

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, resetForm, handleInputChange } =
    useForm(initialValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // console.log(_attr);
      values._id = _attr._id;
      values.email = _attr.email;
      addOrEdit(values, resetForm);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} 
        style={{
          width: '400px'
        }}>
        <Grid container>
          <Grid 
          // item xs={12}
          >
            <Controls.Input
              label="Current Password"
              name="current_password"
              type="password"
              value={values.current_password}
              onChange={handleInputChange}
              error={errors.current_password}
            />
            <Controls.Input
              label="New Password"
              name="new_password"
              type="password"
              value={values.new_password}
              onChange={handleInputChange}
              error={errors.new_password}
              inputProps={{
                pattern:"?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}"
              }}
            />
            <Controls.Input
              label="Confirm New Password"
              name="confirm_new"
              type="password"
              value={values.confirm_new}
              onChange={handleInputChange}
              error={errors.confirm_new}
            />

            {/* <Controls.Input
              name="id"
              type="hidden"
              value={_attr._id}
            />        */}

            <div style={{
              // display: "flex",
              // width: '400px',
              height: '50px',
              padding: '10px',
              fontStyle: 'italic',
              fontSize: '12px',
            }}><h7>Must contain at least one number and one uppercase and
            lowercase letter, and at least 8 or more characters.</h7></div>

            <Controls.Button
              sx={{ m: 2, mt: 4 }}
              size="large"
              type="submit"
              text="Submit"
            />

            <Controls.Button
              sx={{ m: 2, mt: 4 }}
              size="large"
              color="inherit"
              text="Reset"
              onClick={resetForm}
            />
            
          </Grid>
        </Grid>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
