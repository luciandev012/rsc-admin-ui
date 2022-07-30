import * as api from "../apis/manager";

export const getManagers = () => async (dispatch) => {
  const { data } = await api.getManagers();
  dispatch({ type: "GETALL", payload: data });
};

export const addManager = (manager) => async (dispatch) => {
  await api.addManager(manager);
  const { data } = await api.getManagers();
  dispatch({ type: "GETALL", payload: data });
};

export const updateManager = (manager) => async (dispatch) => {
  await api.updateManager(manager);
  const { data } = await api.getManagers();
  dispatch({ type: "GETALL", payload: data });
};

export const deleteManager = (id) => async (dispatch) => {
  await api.deleteManager(id);
  dispatch({ type: "DELETE", payload: id });
};
