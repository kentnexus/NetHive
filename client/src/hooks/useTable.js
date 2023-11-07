import React from "react";
import { useState, useEffect } from "react";
import { Table, Toolbar } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
import dayjs from "dayjs";
import Controls from "../helpers/Controls";
import * as assetService from "../services/assetService";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AssetForm from "../pages/AssetForm";
import Popup from "../helpers/Popup";
import AddIcon from "@mui/icons-material/Add";

const useTable = () => {
  const [rows, setRows] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [rowSelections, setRowSelections] = useState([]);

  const updateRows = (newRow) => {
    setRows((prevRows) => [newRow, ...prevRows]);
  };

  const [editRecord, setEditRecord] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const getAllAssets = async () => {
      const allAssets = await assetService.fetchAssets();
      if (allAssets) setRows(allAssets);
    };
    getAllAssets();
    setIsLoading(false);
  }, []);

  const [openPopup, setOpenPopup] = useState(false);

  const addOrEdit = async (asset, resetForm) => {
    if (isEdit) {
      console.log("this is edit Condition");
      // const newRecord = await assetService.patchAsset(asset);
      // console.log(newRecord);
    } else {
      console.log("This is add condition");

      const newRecord = await assetService.insertAsset(asset);
      updateRows(newRecord);
    }
    setEditRecord(null);
    setIsEdit(false);
    resetForm();
    setOpenPopup(false);
  };

  const deleteRecords = (rowSelections) => {
    const selectedIDs = new Set(rowSelections);
    setIsLoading(true);
    for (var i = 0, len = rowSelections.length; i < len; i++) {
      console.log(rowSelections[i]);
      const result = assetService.deleteAssets(rowSelections[i]);
    }
    setRows((r) => r.filter((x) => !selectedIDs.has(x.assetNumber)));

    setIsLoading(false);
  };

  const columns = [
    {
      field: "Edit",
      headerName: "Edit",
      width: 50,
      disableClickEventBubbling: true,
      renderCell: () => {
        return (
          <GridActionsCellItem
            icon={<EditIcon sx={{ color: "purple" }} />}
            label="Edit"
          >
            <Controls.ActionButton></Controls.ActionButton>
          </GridActionsCellItem>
        );
      },
    },

    {
      field: "assetNumber",
      headerName: "Asset Number",
      width: 200,
      // editable: true,
    },
    {
      field: "customer_account",
      headerName: "Customer Account",
      width: 200,

      // type: "number",
      // width: 180,
      align: "left",
      headerAlign: "left",
      // editable: true,
    },
    {
      field: "product",
      headerName: "Product",
      width: 200,

      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "asset_type",
      headerName: "Asset Type",
      width: 200,

      // width: 180,
      // editable: true,
    },
    {
      field: "device_name",
      headerName: "Device Name",
      width: 200,

      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "manufacturer",
      headerName: "Manufacturer",
      width: 200,

      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "vendor",
      headerName: "Vendor",
      width: 200,

      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "model",
      headerName: "Model",
      width: 200,

      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "model_version",
      headerName: "Model Version",
      width: 200,

      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "serial_number",
      headerName: "Serial Number",
      width: 200,

      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "ip_address",
      headerName: "IP address",
      width: 200,

      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "snmp_community_string",
      headerName: "SNMP Community String",
      width: 200,

      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "location",
      headerName: "Location",
      width: 200,

      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "owner_name",
      headerName: "Owner Name",
      width: 200,

      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "contracts_start_dt",
      headerName: "Contract Start Date",
      width: 200,

      valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
      // width: 180,
      // editable: true,
    },
    {
      field: "contracts_end_dt",
      headerName: "Contract End date",
      width: 200,

      valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
      // width: 180,
      // editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,

      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "vendor_account_manager",
      headerName: "Vendor Account Manager",
      width: 200,

      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "contact_number",
      headerName: "Contact Number",
      width: 200,

      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "contact_email",
      headerName: "Contact Email",
      width: 200,

      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "website",
      headerName: "Website",
      width: 200,

      // width: 220,
      // editable: true,
    },
    {
      field: "service_availed",
      headerName: "Service Availed",
      width: 200,

      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "cost",
      headerName: "Cost",
      width: 200,

      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "tags",
      headerName: "Tags",
      width: 200,

      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "notes",
      headerName: "Notes",
      width: 200,

      // type: "date",
      // width: 180,
      // editable: true,
    },
  ];
  function currentlySelected(params) {
    const field = params.colDef.field;

    if (!(field === "Edit")) {
      return;
    }
    console.log(params.row);

    setIsEdit(true);
    setEditRecord(params.row);
    setOpenPopup(true);
  }

  const TableContainer = (props) => (
    <>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {rowSelections.length === 0 ? (
          ""
        ) : (
          <Controls.Button
            variant="outlined"
            color="secondary"
            text="Delete"
            startIcon={<DeleteIcon />}
            onClick={() => {
              deleteRecords(rowSelections);
            }}
          />
        )}
        <Controls.Button
          variant="outlined"
          color="secondary"
          text="Add Asset"
          startIcon={<AddIcon />}
          onClick={() => {
            setOpenPopup(true);
            setEditRecord(null);
          }}
        />
      </Toolbar>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        getRowId={(rows) => rows.assetNumber}
        initialState={{
          ...rows.initialState,
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        loading={isLoading}
        onCellClick={currentlySelected}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(data) => {
          setRowSelections(data);
        }}
        rowSelectionModel={rowSelections}
      />

      <Popup
        title="Asset Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AssetForm editRecord={editRecord} addOrEdit={addOrEdit} />
      </Popup>
    </>
  );

  return { TableContainer, updateRows, setOpenPopup };
};

export default useTable;