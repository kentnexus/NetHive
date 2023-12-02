import React, { useEffect } from "react";
import MainPageLayout from "../components/MainPageLayout";
import { Paper } from "@mui/material";
import "../styles/Sidebar.css";
const bg = require("../images/bg_nethive.png");
import useTable from "../hooks/useTable";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import * as usersServices from "../services/usersService";
const Inventory = () => {
  const { TableContainer } = useTable();
  const [cookies, removeCookie] = useCookies([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getAllAssets = async (id) => {
      const allAssets = await usersServices.fetchUser(id);
      if (allAssets.status == false) {
        removeCookie("token");
        removeCookie("user");
        navigate("/login");
      }
    };
    const checkAccess = () => {
      getAllAssets(cookies.user._id);
    };
    checkAccess();
  }, []);

  return (
    <MainPageLayout>
      {/* <h1>This is inventory content</h1> */}
      <div>
        <Paper sx={{ p: 1, m: 5, height: 750}} elevation={3}>
          <TableContainer></TableContainer>
        </Paper>
      </div>
    </MainPageLayout>
  );
};

export default Inventory;
