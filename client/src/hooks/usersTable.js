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
import AddIcon from "@mui/icons-material/Add";
import Controls from "../helpers/Controls";
import * as usersService from "../services/usersService";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UserForm from "../pages/UserForm";
import Popup from "../helpers/Popup";
import Notification from "../components/Notification";
import ConfirmDialog from "../components/ConfirmDialog";
import CircleIcon from "@mui/icons-material/Circle";
// import sendEmail from "../functions/sendEmail";
import emailjs from "@emailjs/browser";

const usersTable = () => {
  const [rows, setRows] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [rowSelections, setRowSelections] = useState([]);

  const [popupTitle, setPopupTitle] = useState("");

  const [editRecord, setEditRecord] = useState(null);

  const [isEdit, setIsEdit] = useState(false);

  const updateRows = (newRow) => {
    setRows((prevRows) => [newRow, ...prevRows]);
  };

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

    const getAllUsers = async () => {
      const allUsers = await usersService.fetchUsers();
      if (allUsers) setRows(allUsers);
    };
    getAllUsers();
    setIsLoading(false);
    emailjs.init("62-uW1qeYUH0N3-7N");
  }, []);

  const [openPopup, setOpenPopup] = useState(false);

  const addOrEdit = async (user, resetForm) => {
    if (isEdit) {
      const userInfo = (({
        _id,
        first_name,
        last_name,
        email,
        account_name,
        status,
        // role
      }) => ({
        _id,
        first_name,
        last_name,
        email,
        account_name,
        status,
        // role
      }))(user);
      const newRecord = await usersService.patchUser(userInfo);
      // console.log(newRecord);
      const allUsers = await usersService.fetchUsers();
      if (allUsers) setRows(allUsers);

      setNotify({
        isOpen: true,
        message: "Updated Successfully",
        type: "success",
      });
    } else {
      // console.log("This is add condition");

      const newRecord = await usersService.insertUser(user);
      updateRows(newRecord);
      const serviceId = "service_nethive";
      const templateId = "template_nethive";
      try {
        setIsLoading(true);
        await emailjs.send(serviceId, templateId, {
          to_name: user.first_name,
          from_name: "NetHive Team",
          sender: "nethive4495@gmail.com",
          recipient: user.email,
          message: "This is your temporary password " + user.password
        });
        alert("email successfully sent check inbox");
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }

      setNotify({
        isOpen: true,
        message: "A user has been created",
        type: "success",
      });
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
      console.log(rowSelections[i]);
      const result = usersService.deleteUser(rowSelections[i]);
    }
    setRows((r) => r.filter((x) => !selectedIDs.has(x._id)));
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
    setIsLoading(false);
  };

  const columns = [
    {
      field: "Edit",
      headerName: "Edit",
      width: 100,
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
      field: "first_name",
      headerName: "First Name",
      width: 120,
      align: "left",
      headerAlign: "left",
      // editable: true,
    },
    {
      field: "last_name",
      headerName: "Last Name",
      width: 120,

      // type: "number",
      // width: 180,
      align: "left",
      headerAlign: "left",
      // editable: true,
    },
    {
      field: "account_name",
      headerName: "Company",
      width: 120,
      align: "left",
      headerAlign: "left",
      // width: 180,
      // editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      align: "left",
      headerAlign: "left",
      // width: 180,
      // editable: true,
    },

    {
      field: "status",
      headerName: "Status",
      width: 120,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        if (params.value === true) {
          return <CircleIcon sx={{ color: "green" }} />;
        }
        return <CircleIcon sx={{ color: "red" }} />;
      },
    },
    {
      field: "role",
      headerName: "Role",
      value: "user",
      width: 120,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
  ];
  function currentlySelected(params) {
    const field = params.colDef.field;

    if (!(field === "Edit")) {
      return;
    }
    setPopupTitle("Edit User");

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
          <Controls.Button
            variant="outlined"
            color="secondary"
            text="Add User"
            startIcon={<AddIcon />}
            onClick={() => {
              setPopupTitle("New User");
              setOpenPopup(true);
              setEditRecord(null);
            }}
          />
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
        </Toolbar>
      </GridToolbarContainer>
    );
  }

  const TableContainer = (props) => (
    <>
      {/* <Toolbar sx={{ justifyContent: "space-between" }}>
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
      </Toolbar> */}
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
        loading={isLoading}
        onCellClick={currentlySelected}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(data) => {
          setRowSelections(data);
        }}
        rowSelectionModel={rowSelections}
        slots={{
          toolbar: CustomToolbar,
        }}
      />

      <Popup
        title={popupTitle}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <UserForm
          editRecord={editRecord}
          addOrEdit={addOrEdit}
          popupTitle={popupTitle}
        />
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

export default usersTable;
