import API from "../helper/axios";

export const getAllDish = () => API.get("/Dish/GetAllDish");

export const addDish = (data) => API.post("/Dish/AddDish", data);
