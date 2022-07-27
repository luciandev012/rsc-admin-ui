import * as api from "../apis/auth";

export const getManager = (id) => async (dispatch) => {
  const { data } = await api.getManager(id);
  //console.log(data);
  dispatch({ type: "GET", payload: data });
};
