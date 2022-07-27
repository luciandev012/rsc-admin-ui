import axios from "../helper/axios";

export const getAllDiscount = () => axios.get("/Product/GetAllDiscount");

export const addDiscount = (discount) =>
  axios.post("/Product/AddDiscount", discount);

export const deleteDiscount = (id) =>
  axios.delete(`/Product/DeleteDiscount?id=${id}`);

export const updateDiscount = (discount) =>
  axios.post("/Product/UpdateDiscount", discount);
