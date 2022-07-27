import * as api from "../apis/order";

export const getAllOrder = () => async (dispatch) => {
  const { data } = await api.getAllOrder();
  dispatch({ type: "GETALL", payload: data });
};

export const deleteOrder = (id) => async (dispatch) => {
  const { data } = await api.deleteOrder(id);
  console.log(data);
  dispatch({ type: "DELETE", payload: id });
};

export const updateOrder = (order) => async (dispatch) => {
  console.log(order);
  await api.updateOrder(order);
  const { data } = await api.getAllOrder();
  dispatch({ type: "GETALL", payload: data });
};
