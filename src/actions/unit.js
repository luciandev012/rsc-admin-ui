import * as api from "../apis/unit";

export const getAllUnit = () => async (dispatch) => {
  try {
    const { data } = await api.getAllUnit();
    dispatch({ type: "GETUNITS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addUnit = (unit) => async (dispatch) => {
  //console.log("unit", unit);
  const { status } = await api.createUnit(unit);
  //console.log("data", data);
  if (status == 200) {
    dispatch({ type: "CREATE", payload: unit });
  }
};

export const updateUnit = (unit) => async (dispatch) => {
  await api.updateUnit(unit);
  dispatch({ type: "UPDATE", payload: unit });
};

export const deleteUnit = (id) => async (dispatch) => {
  await api.deleteUnit(id);
  dispatch({ type: "DELETE", payload: id });
};
