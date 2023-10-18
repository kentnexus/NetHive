import React from "react";
import MainPageLayout from "../components/MainPageLayout";
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import "../styles/Sidebar.css";
import { useInventoryContext } from "../hooks/useInventoryContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const Inventory = () => {
  // const [inventory, setInventory] = useState(null);

  const { inventory, dispatch } = useInventoryContext();

  const [number, setNumber] = useState("");
  const [vendor, setVendor] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      const response = await fetch("http://localhost:4000/api/inventory/");
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

    const response = await fetch("http://localhost:4000/api/inventory/", {
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
    const response = await fetch("http://localhost:4000/api/inventory/" + id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_INVENTORY", payload: json });
    }
  };

  return (
    <MainPageLayout>
      {/* <h1>This is inventory content</h1> */}
      <div>
        <Table striped bordered hover responsive className="container-">
          <thead>
            <tr>
              <th></th>
              <th>Number</th>
              <th>Vendor</th>
              <th>Manufacturer</th>
              <th>Model</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {inventory &&
              inventory.map((invt) => (
                <tr key={invt._id}>
                  <td className="text-center">
                    {/* {index + 1} */}
                    <RiDeleteBin6Line
                      onClick={() => {
                        handleDelete(invt._id);
                      }}
                    ></RiDeleteBin6Line>
                    {/* <span>Delete</span> */}
                  </td>
                  <td>{invt.number}</td>
                  <td>{invt.vendor}</td>
                  <td>{invt.manufacturer}</td>
                  <td>{invt.model}</td>
                  <td>
                    {formatDistanceToNow(new Date(invt.createdAt), {
                      addSuffix: true,
                    })}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <div className="justify-content-end">
        <Button variant="outline-secondary" className="m-2">
          DELETE
        </Button>
        <Button variant="outline-secondary" className="m-2">
          MODIFY
        </Button>
        <Button
          variant="outline-secondary"
          className="m-2"
          onClick={toggleSidebar}
        >
          ADD
        </Button>
      </div>
      <div className={`sidebar ${isOpen == true ? "active" : ""}`}>
        <div className="sd-header">
          <h6 className="mb-0">Create New Asset</h6>
          <div className="btn btn-dark" onClick={toggleSidebar}>
            <i className="fa fa-times"></i>
          </div>
        </div>
        <div className="sd-body">
          <Table>
            <tr>
              <td>Number:</td>
              <td>
                <input
                  type="number"
                  onChange={(ev) => setNumber(ev.target.value)}
                  value={number}
                />
              </td>
            </tr>
            <tr>
              <td>Vendor</td>
              <td>
                <input
                  type="text"
                  onChange={(ev) => setVendor(ev.target.value)}
                  value={vendor}
                />
              </td>
            </tr>
            <tr>
              <td>Manufacturer</td>
              <td>
                <input
                  type="text"
                  onChange={(ev) => setManufacturer(ev.target.value)}
                  value={manufacturer}
                />
              </td>
            </tr>
            <tr>
              <td>Model</td>
              <td>
                <input
                  type="text"
                  onChange={(ev) => setModel(ev.target.value)}
                  value={model}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <Button
                  variant="outline-secondary"
                  className="m-2"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="outline-secondary"
                  className="m-2"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </td>
            </tr>
          </Table>
        </div>
      </div>
      <div
        className={`sidebar-overlay ${isOpen == true ? "active" : ""}`}
        onClick={toggleSidebar}
      ></div>
    </MainPageLayout>
  );
};

export default Inventory;
