import React, { useEffect } from "react";
import MainPageLayout from "../components/MainPageLayout";
import Analytics from "../components/Analytics";
const bg = require("../images/bg_nethive.png");
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import * as usersServices from "../services/usersService";

const Dashboard = () => {
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
      <div>
        <Analytics />
      </div>
    </MainPageLayout>
  );
};

export default Dashboard;
