import * as api from "../apis/manager";

export const getManagers = () => async (dispatch) => {
  const { data } = await api.getManagers();
  dispatch({ type: "GETALLMAN", payload: data });
};

export const addManager = (manager) => async (dispatch) => {
  const res = await api.addManager(manager);
  if (res.data[0] == true) {
    const { data } = await api.getManagers();
    dispatch({ type: "GETALLMAN", payload: data });
  } else {
    let message = "";
    res.data.map((m) => (message = message + m + " "));
    alert("Update failed: " + message);
  }
};

export const updateManager = (manager) => async (dispatch) => {
  const res = await api.updateManager(manager);
  if (res.data[0] == true) {
    const { data } = await api.getManagers();
    dispatch({ type: "GETALLMAN", payload: data });
  } else {
    let message = "";
    res.data.map((m) => (message = message + m + " "));
    alert("Update failed: " + message);
  }
};

export const deleteManager = (id) => async (dispatch) => {
  await api.deleteManager(id);
  dispatch({ type: "DELETEMAN", payload: id });
};
