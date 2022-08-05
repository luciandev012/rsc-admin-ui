import * as api from "../apis/staff";
export const getAllCustomer = () => async (dispatch) => {
  const { data } = await api.getAllCustomer();
  dispatch({ type: "GETALLCUS", payload: data });
};

export const deleteCustomer = (id) => async (dispatch) => {
  await api.deleteCustomer(id);
  dispatch({ type: "DELETECUS", payload: id });
};
