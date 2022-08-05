import * as api from "../apis/employee";
import * as staff from "../apis/staff";

export const getAllEmployee = () => async (dispatch) => {
  const { data } = await staff.getALLStaff();
  dispatch({ type: "GETALLEMP", payload: data });
};

export const addEmployee = (form) => async (dispatch) => {
  const res = await api.addEmployee(form);
  if (res.data[0] == "true") {
    const { data } = await staff.getALLStaff();
    dispatch({ type: "GETALLEMP", payload: data });
  } else {
    let message = "";
    res.data.map((m) => (message = message + m + " "));
    alert("Update failed: " + message);
  }
};

export const deleteEmployee = (id) => async (dispatch) => {
  await api.deleteEmployee(id);
  dispatch({ type: "DELETEEMP", payload: id });
};

export const updateEmployee = (form) => async (dispatch) => {
  const res = await api.updateEmployee(form);
  if (res.data[0] == "true") {
    const { data } = await staff.getALLStaff();
    dispatch({ type: "GETALLEMP", payload: data });
  } else {
    let message = "";
    res.data.map((m) => (message = message + m + " "));
    alert("Update failed: " + message);
  }
};
