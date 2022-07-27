import axios from "axios";

const token = window.localStorage.getItem("token");
const auth = `Bearer ${token}`;
//console.log(token);
const axiosIntance = axios.create({
  baseURL: "https://localhost:5001/api/v1/",
  headers: {
    Authorization: token ? auth : "",
  },
});

export default axiosIntance;
