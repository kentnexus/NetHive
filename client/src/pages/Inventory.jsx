import React from "react";
import MainPageLayout from "../components/MainPageLayout";
import { Paper } from "@mui/material";
import "../styles/Sidebar.css";
const bg = require("../images/bg_nethive.png");
import useTable from "../hooks/useTable";

const Inventory = () => {
<<<<<<< HEAD
  // const [inventory, setInventory] = useState(null);

  const { inventory, dispatch } = useInventoryContext();

  const [number, setNumber] = useState("");
  const [vendor, setVendor] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      const response = await fetch("http://localhost:3000/assets");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_INVENTORY", payload: json });
      }
    };

    fetchInventory();
  }, []);

  const [isOpen, setIsopen] = useState(false);

  const toggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };

  const handleSubmit = async (e) => {
    const inventory = { number, vendor, manufacturer, model };

    const response = await fetch("http://localhost:3000/assets", {
      method: "POST",
      body: JSON.stringify(inventory),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      // setEmptyFields(json.emptyFields);
      console.log(error);
    }
    if (response.ok) {
      // setEmptyFields([]);
      setError(null);
      setNumber("");
      setVendor("");
      setManufacturer("");
      setModel("");
      dispatch({ type: "CREATE_INVENTORY", payload: json });
      toggleSidebar();
    }
  };

  const handleCancel = () => {
    setNumber("");
    setVendor("");
    setManufacturer("");
    setModel("");
    toggleSidebar();
  };

  const handleDelete = async (id) => {
    const response = await fetch("http://localhost:3000/assets" + id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_INVENTORY", payload: json });
    }
  };
=======
  const { TableContainer } = useTable();
>>>>>>> c2be9c2770a3916d73eb1c63ba0bc9ac9c1549a1

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
