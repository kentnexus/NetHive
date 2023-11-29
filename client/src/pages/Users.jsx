import React, { useEffect } from "react";
import MainPageLayout from "../components/MainPageLayout";
import usersTable from "../hooks/usersTable";
const bg = require("../images/bg_nethive.png");
import { Paper } from "@mui/material";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import * as usersServices from "../services/usersService";

const Users = () => {
  const { TableContainer } = usersTable();
  const [cookies, removeCookie] = useCookies([]);

  const user = cookies.user.role;

  const navigate = useNavigate();

  // export async function fetchUser(id) {
  //   try {
  //     const response = await axios.get(`http://localhost:3000/users/${id}`);
  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

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
    <>
      {user == "admin" ? (
        <MainPageLayout>
          {/* <h1>This is inventory content</h1> */}
          <div>
            <Paper sx={{ p: 1, m: 5 }} elevation={3}>
              <TableContainer></TableContainer>
            </Paper>
          </div>
        </MainPageLayout>
      ) : (
        <p>404: Page not Found</p>
      )}
    </>
  );
};

export default Users;
