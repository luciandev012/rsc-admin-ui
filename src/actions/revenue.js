import * as api from "../apis/revenue";

export const getRevenue = () => async (dispatch) => {
  const { data } = await api.getRevenue();
  console.log(data);
  dispatch({ type: "GETALLREVENUE", payload: data });
};

export const getRevenueByDate = (req) => async (dispatch) => {
  const { data } = await api.getRevenueBydate(req);
  console.log(data);
  dispatch({ type: "GETBYDATE", payload: data });
};
