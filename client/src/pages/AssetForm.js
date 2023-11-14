import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Controls from "../helpers/Controls";
import { useForm, Form } from "../hooks/useForm";
import * as assetService from "../services/assetService";

const initialValues = {
  assetNumber: "Auto-generated",
  customer_account: "",
  product: "",
  asset_type: "",
  device_name: "",
  manufacturer: "",
  vendor: "",
  model: "",
  model_version: "",
  serial_number: "",
  ip_address: "",
  snmp_community_string: "",
  location: "",
  owner_name: "",
  contracts_start_dt: new Date(),
  contracts_end_dt: new Date(),
  aggregated_to_: "",
  status: "",
  vendor_account_manager: "",
  contact_number: "",
  contact_email: "",
  website: "",
  service_availed: "",
  cost: null,
  tags: "",
  notes: "",
};

const AssetForm = (props) => {
  const { addOrEdit, editRecord } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("customer_account" in fieldValues)
      temp.customer_account = /([A-Z]){3}/.test(fieldValues.customer_account)
        ? ""
        : "Three Uppercase Characters only";
    if ("product" in fieldValues)
      temp.product = fieldValues.product ? "" : "This field is required";
    if ("asset_type" in fieldValues)
      temp.asset_type = fieldValues.asset_type ? "" : "This field is required";
    if ("device_name" in fieldValues)
      temp.device_name = fieldValues.device_name
        ? ""
        : "This field is required";
    if ("manufacturer" in fieldValues)
      temp.manufacturer = fieldValues.manufacturer
        ? ""
        : "This field is required";
    if ("vendor" in fieldValues)
      temp.vendor = fieldValues.vendor ? "" : "This field is required";
    if ("model" in fieldValues)
      temp.model = fieldValues.model ? "" : "This field is required";
    // if ("model_version" in fieldValues)
    //   temp.model_version = fieldValues.model_version
    //     ? ""
    //     : "This field is required";
    // if ("serial_number" in fieldValues)
    //   temp.serial_number = fieldValues.serial_number
    //     ? ""
    //     : "This field is required";
    // if ("ip_address" in fieldValues)
    //   temp.ip_address = fieldValues.ip_address ? "" : "This field is required";
    if ("snmp_community_string" in fieldValues)
      temp.snmp_community_string = fieldValues.snmp_community_string
        ? ""
        : "This field is required";
    if ("location" in fieldValues)
      temp.location = fieldValues.location ? "" : "This field is required";
    if ("owner_name" in fieldValues)
      temp.owner_name = fieldValues.owner_name ? "" : "This field is required";
    // temp.contracts_start_dt = new Date();
    //   temp.contracts_end_dt = new Date();
    // if ("aggregated_to_" in fieldValues)
    //   temp.aggregated_to_ = fieldValues.aggregated_to_
    //     ? ""
    //     : "This field is required";
    if ("status" in fieldValues)
      temp.status = fieldValues.status ? "" : "This field is required";
    if ("vendor_account_manager" in fieldValues)
      temp.vendor_account_manager = fieldValues.vendor_account_manager
        ? ""
        : "This field is required";
    if ("contact_number" in fieldValues)
      temp.contact_number =
        fieldValues.contact_number.length > 9
          ? ""
          : "Minimum 10 numbers required";
    if ("contact_email" in fieldValues)
      temp.contact_email = /$^|^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
        fieldValues.contact_email
      )
        ? ""
        : "Invalid Email";
    if ("website" in fieldValues)
      temp.website =
        /$^|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/.test(
          fieldValues.website
        )
          ? ""
          : "Invalid wesbite";
    if ("service_availed" in fieldValues)
      temp.service_availed = fieldValues.service_availed
        ? ""
        : "This field is required";
    if ("cost" in fieldValues)
      temp.cost = fieldValues.cost > 0 ? "" : "Cannot be 0 or negative";

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
          <Grid item xs={4}>
            <Controls.Input
              disabled="true"
              InputProps={{
                readOnly: true,
              }}
              label="Asset Number"
              name="assetNumber"
              value={values.assetNumber}
            />
            <Controls.Input
              label="Customer Account"
              name="customer_account"
              value={values.customer_account}
              onChange={handleInputChange}
              error={errors.customer_account}
            />
            <Controls.Select
              label="Product"
              name="product"
              value={values.product}
              onChange={handleInputChange}
              options={assetService.getProductTypes()}
              error={errors.product}
            />
            <Controls.Select
              label="Asset Type"
              name="asset_type"
              value={values.asset_type}
              onChange={handleInputChange}
              options={assetService.getAssetTypes()}
              error={errors.asset_type}
            />
            <Controls.Input
              label="Device Name"
              name="device_name"
              value={values.device_name}
              onChange={handleInputChange}
              error={errors.device_name}
            />
            <Controls.Input
              label="Manufacturer"
              name="manufacturer"
              value={values.manufacturer}
              onChange={handleInputChange}
              error={errors.manufacturer}
            />
            <Controls.Input
              label="Vendor"
              name="vendor"
              value={values.vendor}
              onChange={handleInputChange}
              error={errors.vendor}
            />
            <Controls.Input
              label="Model"
              name="model"
              value={values.model}
              onChange={handleInputChange}
              error={errors.model}
            />
          </Grid>

          <Grid item xs={4}>
            <Controls.Input
              label="Model Version"
              name="model_version"
              value={values.model_version}
              onChange={handleInputChange}
              error={errors.model_version}
            />
            <Controls.Input
              label="Serial Number"
              name="serial_number"
              value={values.serial_number}
              onChange={handleInputChange}
              error={errors.serial_number}
            />
            <Controls.Input
              label="IP address"
              name="ip_address"
              value={values.ip_address}
              onChange={handleInputChange}
              error={errors.ip_address}
            />
            <Controls.Input
              label="SNMP Community String"
              name="snmp_community_string"
              value={values.snmp_community_string}
              onChange={handleInputChange}
              error={errors.snmp_community_string}
            />
            <Controls.Input
              label="Location"
              name="location"
              value={values.location}
              onChange={handleInputChange}
              error={errors.location}
            />
            <Controls.Input
              label="Owner Name"
              name="owner_name"
              value={values.owner_name}
              onChange={handleInputChange}
              error={errors.owner_name}
            />
            <Controls.Datepicker
              label="Contract Start Date"
              name="contracts_start_dt"
              value={values.contracts_start_dt}
              onChange={handleInputChange}
              error={errors.contracts_start_dt}
            />
            <Controls.Datepicker
              label="Contract End Date"
              name="contracts_end_dt"
              value={values.contracts_end_dt}
              onChange={handleInputChange}
              error={errors.contracts_end_dt}
            />
          </Grid>
          <Grid item xs={4}>
            {/* <Controls.Input
              label="Aggregated to"
              name="aggregated_to_"
              value={values.aggregated_to_}
              onChange={handleInputChange}
              error={errors.aggregated_to_}
            /> */}
            <Controls.Input
              label="Status"
              name="status"
              value={values.status}
              onChange={handleInputChange}
              error={errors.status}
            />{" "}
            <Controls.Input
              label="Vendor Account Manager"
              name="vendor_account_manager"
              value={values.vendor_account_manager}
              onChange={handleInputChange}
              error={errors.vendor_account_manager}
            />{" "}
            <Controls.Input
              label="Contact Number"
              name="contact_number"
              type="number"
              value={values.contact_number}
              onChange={handleInputChange}
              error={errors.contact_number}
            />{" "}
            <Controls.Input
              label="Contact Email"
              name="contact_email"
              value={values.contact_email}
              onChange={handleInputChange}
              error={errors.contact_email}
            />{" "}
            <Controls.Input
              label="Website"
              name="website"
              value={values.website}
              onChange={handleInputChange}
              error={errors.website}
            />{" "}
            <Controls.Input
              label="Service Availed"
              name="service_availed"
              value={values.service_availed}
              onChange={handleInputChange}
              error={errors.service_availed}
            />
            <Controls.Input
              label="Cost"
              name="cost"
              value={values.cost}
              onChange={handleInputChange}
              error={errors.cost}
              type="number"
            />
            <Controls.Input
              label="Tags"
              name="tags"
              value={values.tags}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <Grid container>
          {/* <Grid item xs={4}></Grid> */}
          <Grid item xs={8}>
            <Controls.Input
              label="Notes"
              name="notes"
              value={values.notes}
              onChange={handleInputChange}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={4}>
            <Controls.Button
              size="large"
              type="submit"
              text="Submit"
              sx={{ m: 1 }}
            />

            <Controls.Button
              color="inherit"
              text="Reset"
              onClick={resetForm}
              size="large"
              sx={{ m: 1 }}
            />
          </Grid>
        </Grid>
      </Form>
    </div>
  );
};

export default AssetForm;
