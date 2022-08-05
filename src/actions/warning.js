import * as api from "../apis/warning";

export const getWarning = () => async (dispatch) => {
  const { data } = await api.getWarning();
  dispatch({ type: "GETALL", payload: data });
};
