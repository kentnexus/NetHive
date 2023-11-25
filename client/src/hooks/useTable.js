import React from "react";
import { useState, useEffect } from "react";
import { Toolbar } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import Controls from "../helpers/Controls";
import * as assetService from "../services/assetService";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AssetForm from "../pages/AssetForm";
import Popup from "../helpers/Popup";
import AddIcon from "@mui/icons-material/Add";
import Notification from "../components/Notification";
import ConfirmDialog from "../components/ConfirmDialog";
import UploadIcon from "@mui/icons-material/Upload";
import { styled } from "@mui/material/styles";
import { Input, InputLabel } from "@mui/material";
import Papa from "papaparse";
import { useCookies } from "react-cookie";
import { all } from "axios";

const useTable = () => {
  const [rows, setRows] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [rowSelections, setRowSelections] = useState([]);

  const [jsonData, setJsonData] = useState([]);

  const [popupTitle, setPopupTitle] = useState("");

  const [cookies, removeCookie] = useCookies([]);

  const _attr = cookies.user.role;

  const updateRows = (newRow) => {
    setRows((prevRows) => [newRow, ...prevRows]);
  };

  const [editRecord, setEditRecord] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  useEffect(() => {
    setIsLoading(true);

    const getAllAssets = async () => {
      const allAssets = await assetService.fetchAssets();
      if (allAssets) {
        if (_attr === "admin") {
          setRows(allAssets);
        } else {
          let filteredRows = [];
          for (let i = 0; i < allAssets.length; i++) {
            if (allAssets[i].customer_account === cookies.user.account_name) {
              filteredRows = [...filteredRows, allAssets[i]];
            }
          }
          setRows(filteredRows);
        }
      }
    };
    getAllAssets();

    setIsLoading(false);
  }, []);

  const [openPopup, setOpenPopup] = useState(false);

  const addOrEdit = async (asset, resetForm) => {
    if (isEdit) {
      const newRecord = await assetService.patchAsset(asset);
      console.log(newRecord);
      const getAllAssets = async () => {
        const allAssets = await assetService.fetchAssets();
        if (allAssets) {
          if (_attr === "admin") {
            setRows(allAssets);
          } else {
            let filteredRows = [];
            for (let i = 0; i < allAssets.length; i++) {
              if (allAssets[i].customer_account === cookies.user.account_name) {
                filteredRows = [...filteredRows, allAssets[i]];
              }
            }
            setRows(filteredRows);
          }
        }
      };
      getAllAssets();
      setNotify({
        isOpen: true,
        message: "Updated Successfully",
        type: "success",
      });
    } else {
      // console.log("This is add condition");

      const newRecord = await assetService.insertAsset(asset);
      updateRows(newRecord);
    }
    setEditRecord(null);
    setIsEdit(false);
    resetForm();
    setOpenPopup(false);
  };

  const deleteRecords = (rowSelections) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    const selectedIDs = new Set(rowSelections);
    setIsLoading(true);
    for (var i = 0, len = rowSelections.length; i < len; i++) {
      // console.log(rowSelections[i]);
      const result = assetService.deleteAssets(rowSelections[i]);
    }
    setRows((r) => r.filter((x) => !selectedIDs.has(x.assetNumber)));
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
    setIsLoading(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // console.log("fetch json", file);
    async function loadFile(file) {
      let text = await new Response(file).text();
      // console.log("loading file");
      // setJsonData(text);
      bulkAdd(text);
      getAllAssets();
    }

    loadFile(file);

    // Papa.parse(file, {
    //   header: true,
    //   skipEmptyLines: true,
    //   complete: function (result) {
    //     console.log(result);
    //     // setCsvData(result.data);
    //   },
    // });

    const bulkAdd = async (jsonText) => {
      // console.log("bulk add", jsonData);
      const newRecord = await assetService.insertBulkAssets(jsonText);
      console.log("success: ", newRecord.data);
    };

    const getAllAssets = async () => {
      const allAssets = await assetService.fetchAssets();
      if (allAssets) {
        if (_attr === "admin") {
          setRows(allAssets);
        } else {
          let filteredRows = [];
          for (let i = 0; i < allAssets.length; i++) {
            if (allAssets[i].customer_account === cookies.user.account_name) {
              filteredRows = [...filteredRows, allAssets[i]];
            }
          }
          setRows(filteredRows);
        }
      }
    };

    event.preventDefault();
  };

  const columns = [
    {
      field: "Edit",
      headerName: "Edit",
      width: 50,
      disableClickEventBubbling: true,
      disableExport: true,
      filterable: false,
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
      width: 120,
      align: "left",
      headerAlign: "left",
      // editable: false,
    },
    {
      field: "customer_account",
      headerName: "Customer Account",
      width: 150,

      // type: "number",
      // width: 180,
      align: "left",
      headerAlign: "left",
      // editable: true,
    },
    {
      field: "product",
      headerName: "Product",
      width: 120,

      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "asset_type",
      headerName: "Asset Type",
      width: 120,
      align: "left",
      headerAlign: "left",

      // width: 180,
      // editable: true,
    },
    {
      field: "device_name",
      headerName: "Device Name",
      width: 130,
      align: "left",
      headerAlign: "left",

      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "manufacturer",
      headerName: "Manufacturer",
      width: 120,
      align: "left",
      headerAlign: "left",

      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "vendor",
      headerName: "Vendor",
      width: 150,
      align: "left",
      headerAlign: "left",
      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "model",
      headerName: "Model",
      width: 150,
      align: "left",
      headerAlign: "left",
      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "model_version",
      headerName: "Model Version",
      width: 120,
      align: "left",
      headerAlign: "left",
      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "serial_number",
      headerName: "Serial Number",
      width: 200,
      align: "left",
      headerAlign: "left",
      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "ip_address",
      headerName: "IP address",
      width: 120,
      align: "left",
      headerAlign: "left",
      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "snmp_community_string",
      headerName: "SNMP Community String",
      width: 120,
      align: "left",
      headerAlign: "left",
      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "location",
      headerName: "Location",
      width: 120,

      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "owner_name",
      headerName: "Owner Name",
      width: 120,
      align: "left",
      headerAlign: "left",
      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "contracts_start_dt",
      headerName: "Contract Start Date",
      width: 150,

      valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
      // width: 180,
      // editable: true,
    },
    {
      field: "contracts_end_dt",
      headerName: "Contract End date",
      width: 150,
      align: "left",
      headerAlign: "left",
      valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
      // width: 180,
      // editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      align: "left",
      headerAlign: "left",
      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "vendor_account_manager",
      headerName: "Vendor Account Manager",
      width: 120,
      align: "left",
      headerAlign: "left",
      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "contact_number",
      headerName: "Contact Number",
      width: 120,
      align: "left",
      headerAlign: "left",
      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "contact_email",
      headerName: "Contact Email",
      width: 120,
      align: "left",
      headerAlign: "left",
      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "website",
      headerName: "Website",
      width: 120,
      align: "left",
      headerAlign: "left",
      // width: 220,
      // editable: true,
    },
    {
      field: "service_availed",
      headerName: "Service Availed",
      width: 120,
      align: "left",
      headerAlign: "left",
      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "cost",
      headerName: "Cost",
      width: 120,
      align: "left",
      headerAlign: "left",
      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "tags",
      headerName: "Tags",
      width: 120,
      align: "left",
      headerAlign: "left",
      // type: "date",
      // width: 180,
      // editable: true,
    },
    {
      field: "notes",
      headerName: "Notes",
      width: 400,
      align: "left",
      headerAlign: "left",
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
    setPopupTitle("Edit Asset");
    setIsEdit(true);
    setEditRecord(params.row);
    setOpenPopup(true);
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Toolbar sx={{ justifyContent: "flex-start" }}>
          <GridToolbarQuickFilter
            sx={{ m: 1, p: 1 }}
            variant="outlined"
            color="secondary"
            size="small"
            text="Filters"
          />
          {rowSelections.length === 0 ? (
            ""
          ) : (
            <Controls.Button
              variant="outlined"
              color="secondary"
              text="Delete"
              startIcon={<DeleteIcon />}
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: `Are you sure you want to delete ${rowSelections.length} record(s)`,
                  subTitle: "This action cannot be undone",
                  onConfirm: () => deleteRecords(rowSelections),
                });
              }}
            />
          )}
          {_attr === "admin" ? (
            <Controls.Button
              sx={{ visibility: _attr === "admin" ? "visible" : "hidden" }}
              variant="outlined"
              color="secondary"
              text="Add Asset"
              startIcon={<AddIcon />}
              onClick={() => {
                setPopupTitle("New Asset");
                setOpenPopup(true);
                setEditRecord(null);
              }}
            />
          ) : (
            " "
          )}

          <GridToolbarColumnsButton
            sx={{ m: 1, p: 1 }}
            size="small"
            variant="outlined"
            color="secondary"
            text="Columns"
          />
          <GridToolbarDensitySelector
            sx={{ m: 1, p: 1 }}
            variant="outlined"
            color="secondary"
            size="small"
            text="Columns"
          />
          <GridToolbarFilterButton
            sx={{ m: 1, p: 1 }}
            variant="outlined"
            color="secondary"
            size="small"
            text="Columns"
          />
          <GridToolbarExport
            sx={{ m: 1, p: 1 }}
            size="small"
            variant="outlined"
            color="secondary"
            text="Export"
            printOptions={{
              hideFooter: true,
              hideToolbar: true,
            }}
            csvOptions={{ allColumns: true }}
          />
          {_attr === "admin" ? (
            <InputLabel htmlFor="upload">
              <Controls.Button
                variant="outlined"
                color="secondary"
                startIcon={<UploadIcon />}
                component="span"
                text="Import"
              ></Controls.Button>
            </InputLabel>
          ) : (
            " "
          )}
          <input
            type="file"
            style={{ display: "none" }}
            id="upload"
            accept=".json"
            onChange={handleFileUpload}
          />
          {/* <Controls.Button
            variant="outlined"
            color="secondary"
            // type="file"
            // accept=".csv"
            startIcon={<UploadIcon />}
            component="label"

            // onClick={(e) => handleFileUpload(e)}
          >
            <input type="file" accept=".csv" hidden />
          </Controls.Button> */}
        </Toolbar>
      </GridToolbarContainer>
    );
  }

  const TableContainer = (props) => (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(rows) => rows.assetNumber}
        initialState={{
          columns: {
            columnVisibilityModel: {
              // Hide columns status and traderName, the other columns will remain visible
              Edit: _attr !== "admin" ? false : true,
            },
          },

          ...rows.initialState,
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        loading={isLoading}
        checkboxSelection={_attr !== "admin" ? false : true}
        disableRowSelectionOnClick
        onRowSelectionModelChange={(data) => setRowSelections(data)}
        rowSelectionModel={rowSelections}
        onCellClick={currentlySelected}
        slots={{
          toolbar: CustomToolbar,
        }}
      />

      <Popup
        title={popupTitle}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AssetForm editRecord={editRecord} addOrEdit={addOrEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );

  return { TableContainer, updateRows, setOpenPopup };
};

export default useTable;
