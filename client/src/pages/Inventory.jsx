import React from "react";
import MainPageLayout from "../components/MainPageLayout";
import { Paper } from "@mui/material";
import "../styles/Sidebar.css";
const bg = require("../images/bg_nethive.png");
import useTable from "../hooks/useTable";

const Inventory = () => {
  const { TableContainer } = useTable();

  return (
    <MainPageLayout>
      {/* <h1>This is inventory content</h1> */}
      <div
        style={{
          backgroundImage: `url(${bg})`,
          minHeight: "100vh",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Paper sx={{ p: 3, m: 5 }} elevation={3}>
          <TableContainer></TableContainer>
        </Paper>
      </div>
    </MainPageLayout>
  );
};

export default Inventory;
