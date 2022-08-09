import * as api from "../apis/category";

export const getAllSubCate = () => async (dispatch) => {
  const res = await api.getAllSubCate();
  console.log(res);
  dispatch({ type: "GETALLSUBCATE", payload: res });
};
