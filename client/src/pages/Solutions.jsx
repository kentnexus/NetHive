import React, { useEffect } from "react";
import MainPageLayout from "../components/MainPageLayout";
const bg = require("../images/bg_nethive.png");
import SolutionList from "../components/SolutionList";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import * as usersServices from "../services/usersService";

const Solutions = () => {
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
        <SolutionList />
      </div>
    </MainPageLayout>
  );
};

export default Solutions;
