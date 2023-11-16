import axios from "axios";

export const getUserRoles = () => [
  { id: "1", title: "admin" },
  { id: "2", title: "User" },
];

export async function patchUser(data) {
  const request = {
    ...data,
  };
  console.log(request);
  try {
    const response = await axios.patch(`/users/${request._id}`, request);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}
export function deleteUser(id) {
  try {
    const response = axios.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchUsers() {
  try {
    const response = await axios.get("/users");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function insertUser(data) {
  const request = {
    ...data,
  };
  try {
    const response = await axios.post("/signup", request);
    const data = await response.data.user;
    return data;
  } catch (error) {
    console.error(error);
  }
}