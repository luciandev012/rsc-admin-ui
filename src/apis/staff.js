import axios from "helper/axios";

export const getALLStaff = () => axios.get("/Manager/GetStaffList");

export const getAllCustomer = () => axios.get("/Manager/GetCustomerList");

export const deleteCustomer = (id) =>
  axios.delete(`/Manager/DeleteCustomer?id=${id}`);
