import React from "react";
import { useState, useEffect } from "react";
import { Table } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import dayjs from "dayjs";

const useTable = (records, headCells) => {
  const [rows, setRows] = useState("");

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        await axios
          .get("/assets")
          .then((response) => {
            setRows(response.data);
            // console.log(rows);
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.error(error);
      }
    };

    fetchAssets();
  }, []);

  const columns = [
    {
      field: "assetNumber",
      headerName: "Asset Number",
      // width: 180,
      // editable: true,
    },
    {
      field: "customer_account",
      headerName: "Customer Account",
      // type: "number",
      // width: 180,
      align: "left",
      headerAlign: "left",
      // editable: true,
    },
    {
      field: "product",
      headerName: "Product",
      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "asset_type",
      headerName: "Asset Type",
      // width: 180,
      // editable: true,
    },
    {
      field: "device_name",
      headerName: "Device Name",
      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "manufacturer",
      headerName: "Manufacturer",
      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "vendor",
      headerName: "Vendor",
      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "model",
      headerName: "Model",
      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "model_version",
      headerName: "Model Version",
      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "serial_number",
      headerName: "Serial Number",
      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "ip_address",
      headerName: "IP address",
      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "snmp_community_string",
      headerName: "SNMP Community String",
      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "location",
      headerName: "Location",
      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "owner_name",
      headerName: "Owner Name",
      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "contracts_start_dt",
      headerName: "Contract Start Date",
      valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
      // width: 180,
      // editable: true,
    },
    {
      field: "contracts_end_dt",
      headerName: "Contract End date",
      valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
      // width: 180,
      // editable: true,
    },
    {
      field: "website",
      headerName: "Website",
      // width: 220,
      // editable: true,
    },

    // {
    //   field: "contracts_start_dt",
    //   headerName: "Contract Start Date",
    //   type: "dateTime",
    //   valueGetter: ({ value }) => value && new Date(value),
    //   width: 220,
    //   editable: true,
    // },
    {
      field: "ip_address",
      headerName: "IP Address",
      // width: 100,
      // editable: true,
    },
  ];

  const TableContainer = (props) => (
    <DataGrid
      autoHeight
      rows={rows}
      columns={columns}
      getRowId={(rows) => rows._id}
      initialState={{
        ...rows.initialState,
        pagination: { paginationModel: { pageSize: 5 } },
      }}
      pageSizeOptions={[5, 10, 25]}
      // checkboxSelection
      // disableRowSelectionOnClick
    />
  );

  return { TableContainer };
};

export default useTable;
