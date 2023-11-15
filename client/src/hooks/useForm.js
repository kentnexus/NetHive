import { FormControl } from "@mui/material";
import React, { useState } from "react";

export function useForm(initialValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, setValues, errors, setErrors, resetForm, handleInputChange };
}

export function Form(props) {
  const { children, ...other } = props;

  return <form {...other}>{props.children}</form>;
}
