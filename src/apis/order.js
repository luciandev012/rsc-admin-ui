import API from "../helper/axios";

export const getAllOrder = () => API.get("/Order/GetAllOrderIncludeOderDetail");

export const deleteOrder = (id) => API.delete(`/Order/DeleteOder?id=${id}`);

export const updateOrder = (order) => API.post("/Order/UpdateOrder", order);
