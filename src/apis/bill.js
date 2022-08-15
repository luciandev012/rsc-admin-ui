import API from "../helper/axios";

export const getBillByOrder = (orderId, numDish) =>
  API.get(`/Dish/GetDishByOrder?numDishReturn=${numDish}&orderId=${orderId}`);
