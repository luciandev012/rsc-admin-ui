import * as api from "../apis/dish";

export const getAllDish = () => async (dispatch) => {
  const { data } = await api.getAllDish();
  dispatch({ type: "GETALLDISH", payload: data });
};

export const addDish = (inputData) => async (dispatch) => {
  await api.addDish(inputData);
  const { data } = await api.getAllDish();
  dispatch({ type: "GETALLDISH", payload: data });
};
