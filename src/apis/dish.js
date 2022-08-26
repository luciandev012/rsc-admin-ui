import API from "../helper/axios";

export const getAllDish = () => API.get("/Dish/GetAllDish");

export const addDish = (data) => API.post("/Dish/AddDish", data);

export const updateDish = (data) => API.post("/Dish/UpdateDish", data);

export const deleteDish = (id) => API.delete(`Dish/DeleteDish?id=${id}`);
