import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Controls from "../helpers/Controls";
import { useForm, Form } from "../hooks/useForm";
import * as usersService from "../services/usersService";

const initialValues = {
  current_password: "",
  new_password: "",
  confirm_new: "",
};

const ChangePasswordForm = (props) => {
  const { addOrEdit, editRecord, popupTitle } = props;

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
      // console.log(values);
      addOrEdit(values, resetForm);
    }
  };

  // useEffect(() => {
  //   if (editRecord != null) {
  //     setValues({ ...editRecord });
  //   }
  // }, [editRecord]);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <Controls.Input
              label="Current Password"
              name="current_password"
              // type="password"
              value={values.current_password}
              onChange={handleInputChange}
              error={errors.current_password}
            />
            <Controls.Input
              label="New Password"
              name="new_password"
              // type="password"
              value={values.new_password}
              onChange={handleInputChange}
              error={errors.new_password}
            />

            <Controls.Input
              label="Confirm New Password"
              name="confirm_new"
              // type="password"
              value={values.confirm_new}
              onChange={handleInputChange}
              error={errors.confirm_new}
            />

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
