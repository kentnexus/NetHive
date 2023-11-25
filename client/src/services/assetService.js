import axios from "axios";
import {
  useEffect
} from "react";

export const getProductTypes = () => [{
    id: "1",
    title: "Switch"
  },
  {
    id: "2",
    title: "Router"
  },
  {
    id: "3",
    title: "Workstation"
  },
  {
    id: "4",
    title: "Firewall"
  },
  {
    id: "5",
    title: "AP"
  },
];
export const getStatusTypes = () => [{
    id: "1",
    title: "Active"
  },
  {
    id: "2",
    title: "Decommisioned"
  },
  {
    id: "3",
    title: "Maintenance"
  },
  {
    id: "4",
    title: "In-Stock"
  },
];

export const getAssetTypes = () => [{
    id: "1",
    title: "Hardware"
  },
  {
    id: "2",
    title: "Software"
  },
];

export async function insertAsset(data) {
  const request = {
    ...data,
  };
  try {
    const response = await axios.post("http://localhost:3000/assets", request);
    const data = await response.data.createdAsset;
    return data;
  } catch (error) {
    console.error(error);
  }
}

// <<<<<<< HEAD
// export function insertBulkAssets(data) {
//   const request = data;
// =======
export async function insertBulkAssets(data) {
  const request = await data;
  // >>>>>>> a3c5b6d155af188a5fff33253813107809428ae6
  // console.log("request data: ", request);

  try {
    const response = axios.post("http://localhost:3000/assets/bulk", request, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response;
    // console.log(data);
    return data;
  } catch (error) {
    return error.response.data;
  }
}

export async function patchAsset(data) {
  const request = {
    ...data,
  };
  console.log(request);
  try {
    const response = await axios.patch(`http://localhost:3000/assets/${request.assetNumber}`, request);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}
export function deleteAssets(id) {
  try {
    const response = axios.delete(`http://localhost:3000/assets/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchAssets() {
  try {
    const response = await axios.get("http://localhost:3000/assets");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}