import axios from "../helper/axios";

export const getManager = (id) => axios.get(`/Manager/GetManager?id=${id}`);

export const changePassword = (model) =>
  axios.post("/Account/ChangePassword", model);
