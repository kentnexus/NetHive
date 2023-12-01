import axios from "axios";

export const getUserRoles = () => [
  { id: "1", title: "admin" },
  { id: "2", title: "user" },
];

export async function patchUser(data) {
  const request = {
    ...data,
  };
  // console.log(request);
  try {
    const response = await axios.patch(
      `/api/users/${request._id}`,
      request
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function patchPassword(data) {
  const request = {
    ...data,
  };
  // console.log(request);
  try {
    const response = await axios.patch(
      `/api/users/password/${request._id}`,
      request
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

export function deleteUser(id) {
  try {
    const response = axios.delete(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchUsers() {
  try {
    const response = await axios.get("/api/users");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchUser(id) {
  try {
    const response = await axios.get(`/api/users/${id}`);
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
    const response = await axios.post("/api/signup", request);
    const data = await response.data.user;
    return data;
  } catch (error) {
    console.error(error);
  }
}
