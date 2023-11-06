import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Box from "@mui/material/Box";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Container,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import "../styles/Sidebar.css";

// import {
//   randomCreatedDate,
//   randomTraderName,
//   randomId,
//   randomArrayItem,
// } from "@mui/x-data-grid-generator";
// import { tempAsset } from "../misc/tempAsset";

const AssetTable = () => {
  const [rows, setRows] = useState("");
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        await axios
          .get("/assets")
          .then((response) => setRows(response.data))
          .catch((error) => console.log(error));
      } catch (error) {
        console.error(error);
      }
    };

    fetchAssets();
  }, []);

  const [isOpen, setIsopen] = useState(false);

  const toggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };

  const [asset_type, setAsset_type] = useState("");

  const initialState = {
    assetNumber: "",
    customer_account: "",
    product: "",
    // asset_type: "",
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
    // contracts_start_dt: null,
    // contracts_end_dt: null,
    website: "",
    cost: null,
  };
  const [data, setData] = useState(initialState);

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleChangeSelect = (event) => {
    setAsset_type(event.target.value);
  };
  const handleSubmit = async (data, asset_type) => {
    try {
      await axios
        .post("/assets", {
          assetNumber: data.assetNumber,
          asset_type: asset_type,
          customer_account: data.customer_account,
          product: data.product,
          device_name: data.device_name,
          manufacturer: data.manufacturer,
          vendor: data.vendor,
          model: data.model,
          model_version: data.model_version,
        })
        .then((response) => {
          setRows((oldRows) => [response.data, ...oldRows]);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.error(error);
    }
  };
  const handleCancel = () => {
    setData(initialState);
    setAsset_type("");
    toggleSidebar();
  };

  function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
      setRows((oldRows) => [{ id, isNew: true }, ...oldRows]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
      }));
    };

    const handleDeleteClick = (id) => () => {
      setRows(rows.filter((row) => row.id !== id));
    };

    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={toggleSidebar}>
          Add record
        </Button>
        <Button
          color="primary"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteClick}
        >
          Delete record(s)
        </Button>
      </GridToolbarContainer>
    );
  }

  const [state, setState] = React.useState({
    left: false,
  });

  // const toggleDrawer = (anchor, open) => (event) => {
  //   if (
  //     event.type === "keydown" &&
  //     (event.key === "Tab" || event.key === "Shift")
  //   ) {
  //     return;
  //   }

  //   setState({ ...state, [anchor]: open });
  // };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  // const handleRowModesModelChange = (newRowModesModel) => {
  //   setRowModesModel(newRowModesModel);
  // };

  const columns = [
    {
      field: "assetNumber",
      headerName: "Asset Number",
      width: 180,
      editable: true,
    },
    {
      field: "customer_account",
      headerName: "Customer Account",
      // type: "number",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "product",
      headerName: "Product",
      // type: "date",
      width: 180,
      editable: true,
    },
    {
      field: "website",
      headerName: "Website",
      width: 220,
      editable: true,
    },
    {
      field: "contracts_start_dt",
      headerName: "Contract Start Date",
      type: "dateTime",
      valueGetter: ({ value }) => value && new Date(value),
      width: 220,
      editable: true,
    },
    {
      field: "ip_address",
      headerName: "IP Address",
      width: 100,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Edit",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          // <GridActionsCellItem
          //   icon={<DeleteIcon />}
          //   label="Delete"
          //   onClick={handleDeleteClick(id)}
          //   color="inherit"
          // />,
        ];
      },
    },
  ];

  return (
    <div>
      <Container>
        <Box
          sx={{
            backgroundColor: "white",
            height: 600,
            width: "100%",
            "& .actions": {
              color: "text.secondary",
            },
            // "& .textPrimary": {
            //   color: "text.primary",
            // },
          }}
        >
          <DataGrid
            rows={rows}
            getRowId={(row) => row._id}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 25]}
            editMode="row"
            rowModesModel={rowModesModel}
            // onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{
              toolbar: EditToolbar,
            }}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </Container>

      <div className={`sidebar ${isOpen == true ? "active" : ""}`}>
        <div className="sd-header">
          <h6 className="mb-0">Create New Asset</h6>
          <div className="btn btn-dark" onClick={toggleSidebar}>
            <i className="fa fa-times"></i>
          </div>
        </div>
        <Button variant="contained" className="m-2" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          className="m-2"
          onClick={() => handleSubmit(data, asset_type)}
        >
          Submit
        </Button>
        <div className="sd-body">
          <TextField
            id="assetNumber"
            name="assetNumber"
            value={data.assetNumber}
            onChange={handleChange}
            label="Asset Number"
            variant="standard"
            style={{ width: 300 }}
            size="small"
            required
          />
          <br />
          <TextField
            id="customer_account"
            name="customer_account"
            value={data.customer_account}
            onChange={handleChange}
            label="Customer Account"
            variant="standard"
            style={{ width: 300 }}
            size="small"
            required
          />
          <br />
          <FormControl>
            <TextField
              id="product"
              name="product"
              value={data.product}
              onChange={handleChange}
              label="Product"
              variant="standard"
              style={{ width: 300 }}
              size="small"
              required
            />
          </FormControl>
          <br />
          <FormControl>
            <InputLabel id="demo-simple-select-standard-label">
              Asset Type
            </InputLabel>
            <Select
              variant="standard"
              labelId="demo-simple-select-standard-label"
              id="asset_tpye"
              name="asset_tpye"
              value={asset_type}
              onChange={handleChangeSelect}
              style={{ width: 300 }}
              size="small"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Hardware</MenuItem>
              <MenuItem value={2}>Software</MenuItem>
            </Select>
          </FormControl>
          <br />
          <TextField
            id="device_name"
            name="device_name"
            value={data.device_name}
            onChange={handleChange}
            label="Device Name"
            variant="standard"
            style={{ width: 300 }}
            size="small"
            required
          />
          <br />
          <TextField
            id="manufacturer"
            name="manufacturer"
            value={data.manufacturer}
            onChange={handleChange}
            label="Manufacturer"
            variant="standard"
            style={{ width: 300 }}
            size="small"
            required
          />
          <br />
          <TextField
            id="vendor"
            name="vendor"
            value={data.vendor}
            onChange={handleChange}
            label="Vendor"
            variant="standard"
            style={{ width: 300 }}
            size="small"
            required
          />{" "}
          <br />
          <TextField
            id="model"
            name="model"
            value={data.model}
            onChange={handleChange}
            label="Model"
            variant="standard"
            style={{ width: 300 }}
            size="small"
            required
          />{" "}
          <br />
          <TextField
            id="model_version"
            name="model_version"
            value={data.model_version}
            onChange={handleChange}
            label="Model Version"
            variant="standard"
            style={{ width: 300 }}
            size="small"
            required
          />{" "}
          <br />
          <TextField
            id="serial_number"
            name="serial_number"
            value={data.serial_number}
            onChange={handleChange}
            label="Serial Number"
            variant="standard"
            style={{ width: 300 }}
            size="small"
            required
          />{" "}
          <br />
          <TextField
            id="ip_address"
            name="ip_address"
            value={data.ip_address}
            onChange={handleChange}
            label="IP Address"
            variant="standard"
            style={{ width: 300 }}
            size="small"
            required
          />{" "}
          <br />
          <TextField
            id="snmp_community_string"
            name="snmp_community_string"
            value={data.snmp_community_string}
            onChange={handleChange}
            label="snmp_community_string"
            variant="standard"
            style={{ width: 300 }}
            size="small"
            required
          />{" "}
          <br />
          <TextField
            id="location"
            name="location"
            value={data.location}
            onChange={handleChange}
            label="Location"
            variant="standard"
            style={{ width: 300 }}
            size="small"
            required
          />{" "}
          <br />
          <TextField
            id="owner_name"
            name="owner_name"
            value={data.owner_name}
            onChange={handleChange}
            label="Owner Name"
            variant="standard"
            style={{ width: 300 }}
            size="small"
            required
          />{" "}
          <br />
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              id="contracts_start_dt"
              name="contracts_start_dt"
              value={data.contracts_start_dt}
              onChange={handleChange}
              style={{ width: 300 }}
              label="Contract created at"
              slotProps={{
                textField: {
                  variant: "standard",
                  style: { width: 300 },
                },
              }}
            />
          </LocalizationProvider>
          <br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              id="contracts_end_dt"
              name="contracts_end_dt"
              value={data.contracts_end_dt}
              onChange={handleChange}
              style={{ width: 300 }}
              label="Contract End at"
              slotProps={{
                textField: {
                  variant: "standard",
                  style: { width: 300 },
                },
              }}
            />
          </LocalizationProvider> */}
          <br />
          <TextField
            id="website"
            name="website"
            value={data.website}
            onChange={handleChange}
            label="Website"
            variant="standard"
            style={{ width: 300 }}
            size="small"
            required
          />
          <br />
          <TextField
            id="cost"
            name="cost"
            value={data.cost}
            onChange={handleChange}
            label="Cost"
            type="number"
            variant="standard"
            style={{ width: 300 }}
            size="small"
            required
          />
        </div>
      </div>
      <div
        className={`sidebar-overlay ${isOpen == true ? "active" : ""}`}
        onClick={toggleSidebar}
      ></div>
    </div>
  );
};

export default AssetTable;
