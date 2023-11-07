import axios from "axios";

export const getProductTypes = () => [
  { id: "1", title: "Switch" },
  { id: "2", title: "Router" },
  { id: "3", title: "Workstation" },
];

export const getAssetTypes = () => [
  { id: "1", title: "Hardware" },
  { id: "2", title: "Software" },
];

export async function insertAsset(data) {
  const request = {
    ...data,
  };
  try {
    const response = await axios.post("/assets", request);
    const data = await response.data.createdAsset;
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function patchAsset(data) {
  const request = {
    ...data,
  };
  console.log(request);
  try {
    const response = await axios.patch(`/assets/${request._id}`, request);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}
export function deleteAssets(id) {
  try {
    const response = axios.delete(`/assets/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchAssets() {
  try {
    const response = await axios.get("/assets");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}