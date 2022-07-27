import * as api from "../apis/discount";

export const getAllDiscount = () => async (dispatch) => {
  const { data } = await api.getAllDiscount();
  dispatch({ type: "GETALL", payload: data });
};

export const addDiscount = (discount) => async (dispatch) => {
  const { status } = await api.addDiscount(discount);
  if (status == 200) {
    const { data } = await api.getAllDiscount();
    dispatch({ type: "GETALL", payload: data });
  }
};

export const deleteDiscount = (id) => async (dispatch) => {
  await api.deleteDiscount(id);
  dispatch({ type: "DELETE", payload: id });
};

export const updateDiscount = (discount) => async (dispatch) => {
  console.log(discount);
  await api.updateDiscount(discount);
  dispatch({ type: "UPDATE", payload: discount });
};
