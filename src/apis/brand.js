import API from "../helper/axios";

export const getAllBrand = () => API.get("/Product/GetAllBrands");

export const createBrand = (brand) => API.post("/Product/AddBrand", brand);

export const updateBrand = (brand) => API.post("/Product/UpdateBrand", brand);

export const deleteBrand = (id) => API.delete(`/Product/DeleteBrand?id=${id}`);
