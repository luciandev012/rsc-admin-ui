import * as api from "../apis/bill";

export const getBillByOrder = (orderId, numDish) => async (dispatch) => {
  const { data } = await api.getBillByOrder(orderId, numDish);
  console.log(data);
  dispatch({ type: "GETBILLBYORDER", payload: data });
};
