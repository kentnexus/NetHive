import React from "react";
import MainPageLayout from "../components/MainPageLayout";
import usersTable from "../hooks/usersTable";
const bg = require("../images/bg_nethive.png");
import { Paper } from "@mui/material";

const Users = () => {
  const { TableContainer } = usersTable();

  return (
    <MainPageLayout>
      {/* <h1>This is inventory content</h1> */}
      <div>
        <Paper sx={{ p: 1, m: 5 }} elevation={3}>
          <TableContainer></TableContainer>
        </Paper>
      </div>
    </MainPageLayout>
  );
};

export default Users;
