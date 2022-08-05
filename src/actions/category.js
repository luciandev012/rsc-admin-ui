import * as api from "../apis/category";

export const getAllCategories = () => async (dispatch) => {
  const { data } = await api.getAllCates();
  dispatch({ type: "GETCATES", payload: data });
};

export const addCategory = (cate) => async (dispatch) => {
  await api.addCategory(cate);
  const { data } = await api.getAllCates();
  dispatch({ type: "GETCATES", payload: data });
};

export const deleteCategory = (id) => async (dispatch) => {
  await api.deleteCategory(id);
  dispatch({ type: "DELETECATE", payload: id });
};

export const updateCategory = (cate) => async (dispatch) => {
  await api.updateCategory(cate);
  const { data } = await api.getAllCates();
  dispatch({ type: "GETCATES", payload: data });
};
