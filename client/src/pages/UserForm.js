import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Controls from "../helpers/Controls";
import { useForm, Form } from "../hooks/useForm";
import * as usersService from "../services/usersService";
var generator = require("generate-password");

var myPassword = generator.generate({
  length: 8,
  numbers: true,
});

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  account_name: "",
  password: myPassword,
  status: false,
  role: "",
};
const statusItems = [
  { id: 1, value: true, title: "Active" },
  { id: 2, value: false, title: "Inactive" },
];

const UserForm = (props) => {
  const { addOrEdit, editRecord, popupTitle } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("first_name" in fieldValues)
      temp.first_name = /^[A-Za-z]+$/.test(fieldValues.first_name)
        ? ""
        : "Invalid Name";
    if ("last_name" in fieldValues)
      temp.last_name = /^[A-Za-z]+$/.test(fieldValues.last_name)
        ? ""
        : "Invalid Name";
    if ("account_name" in fieldValues)
      temp.account_name = /([A-Z]){3}/.test(fieldValues.account_name)
        ? ""
        : "Three Uppercase Characters only";
    if ("role" in fieldValues)
      temp.role = fieldValues.role ? "" : "This field is required";
    if ("email" in fieldValues)
      temp.email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(fieldValues.email)
        ? ""
        : "Invalid Email";

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

  useEffect(() => {
    if (editRecord != null) {
      setValues({ ...editRecord });
    }
  }, [editRecord]);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={6}>
            <Controls.Input
              label="First Name"
              name="first_name"
              value={values.first_name}
              onChange={handleInputChange}
              error={errors.first_name}
            />
            <Controls.Input
              label="Company"
              name="account_name"
              value={values.account_name}
              onChange={handleInputChange}
              error={errors.account_name}
            />
            <Controls.Select
              label="Role"
              name="role"
              value={values.role}
              onChange={handleInputChange}
              options={usersService.getUserRoles()}
              error={errors.role}
            />
            <Controls.RadioGroup
              sx={{ width: "90%", m: 1 }}
              label="Status"
              name="status"
              value={values.status}
              items={statusItems}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Input
              label="Last Name"
              name="last_name"
              value={values.last_name}
              onChange={handleInputChange}
              error={errors.last_name}
            />

            <Controls.Input
              label="Email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
              error={errors.email}
            />
            {popupTitle === "New User" ? (
              <Controls.Input
                disabled
                label="Password"
                name="password"
                value={values.password}
                onChange={handleInputChange}
              />
            ) : (
              ""
            )}
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

          {/* <Controls.Select
              label="Asset Type"
              name="asset_type"
              value={values.status}
              onChange={handleInputChange}
              options={statusItems}
              error={errors.asset_type}
            /> */}

          {/* <Grid item xs={4}></Grid> */}
        </Grid>
      </Form>
    </div>
  );
};

export default UserForm;
