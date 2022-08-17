import API from "../helper/axios";

export const getAllProducts = () => API.get("/Product/GetAllProduct");

export const addProduct = (form) => API.post("/Product/AddProduct", form);

export const deleteProduct = (id) =>
  API.delete(`/Product/DeleteProduct?id=${id}`);

export const updateProduct = (form) => API.post("/Product/UpdateProduct", form);

export const getQRCode = (id) =>
  API.post(`/Product/CreateQRCodeProduct?id=${id}`);

export const getBarCode = (id) =>
  API.post(`/Product/CreateBarCodeProduct?id=${id}`);

export const getProductById = (id) =>
  API.get(`/Product/GetProductById?id=${id}`);
