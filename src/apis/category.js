import API from "../helper/axios";

export const getAllCates = () =>
  API.get("/Product/GetAllCategoriesandSubcategories");

export const addCategory = (cate) => API.post("/Product/AddCategory", cate);

export const deleteCategory = (id) =>
  API.delete(`/Product/DeleteCategory?id=${id}`);

export const updateCategory = (cate) =>
  API.post("/Product/UpdateCategory", cate);
