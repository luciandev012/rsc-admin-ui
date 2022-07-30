import API from "../helper/axios";

export const getManagers = () => API.get("/Admin/GetManagerList");

export const addManager = (manager) => API.post("/Admin/AddManager", manager);

export const updateManager = (manager) =>
  API.post("/Admin/UpdateManager", manager);

export const deleteManager = (id) => {
  API.delete(`/Admin/DeleteManager?managerId=${id}`);
};
