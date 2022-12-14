import * as api from "../apis/discount";

export const getAllDiscount = () => async (dispatch) => {
  const { data } = await api.getAllDiscount();
  dispatch({ type: "GETALLDIS", payload: data });
};

export const addDiscount = (discount) => async (dispatch) => {
  const { status } = await api.addDiscount(discount);
  if (status == 200) {
    const { data } = await api.getAllDiscount();
    dispatch({ type: "GETALLDIS", payload: data });
  }
};

export const deleteDiscount = (id) => async (dispatch) => {
  await api.deleteDiscount(id);
  dispatch({ type: "DELETEDIS", payload: id });
};

export const updateDiscount = (discount) => async (dispatch) => {
  console.log(discount);
  await api.updateDiscount(discount);
  dispatch({ type: "UPDATEDIS", payload: discount });
};
