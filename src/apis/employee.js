import API from "../helper/axios";

export const addEmployee = (form) => API.post("/Manager/AddStaff", form);

export const deleteEmployee = (id) =>
  API.delete(`/Manager/DeleteStaff?staffId=${id}`);

export const updateEmployee = (form) => API.post("/Manager/UpdateStaff", form);
