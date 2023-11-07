import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Controls from "../helpers/Controls";
import { useForm, Form } from "../hooks/useForm";
import * as usersService from "../services/usersService";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
};

const UserForm = (props) => {
  const { addOrEdit, editRecord } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("first_name" in fieldValues)
      temp.first_name = fieldValues.first_name ? "" : "This field is required";
    if ("last_name" in fieldValues)
      temp.last_name = fieldValues.last_name ? "" : "This field is required";
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
          <Grid item xs={12}>
            <Controls.Input
              label="First Name"
              name="first_name"
              value={values.first_name}
              onChange={handleInputChange}
              error={errors.first_name}
            />
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
            <Controls.Button type="submit" text="Submit" />

            <Controls.Button color="inherit" text="Reset" onClick={resetForm} />
          </Grid>

          {/* <Grid item xs={4}></Grid> */}
        </Grid>
      </Form>
    </div>
  );
};

export default UserForm;
