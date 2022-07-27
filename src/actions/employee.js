import * as api from "../apis/employee";
import * as staff from "../apis/staff";

export const getAllEmployee = () => async (dispatch) => {
  const { data } = await staff.getALLStaff();
  dispatch({ type: "GETALL", payload: data });
};

export const addEmployee = (form) => async (dispatch) => {
  const { data, status } = await api.addEmployee(form);
  console.log(data);
  if (status == 200) {
    const { data } = await staff.getALLStaff();
    dispatch({ type: "GETALL", payload: data });
  }
};

export const deleteEmployee = (id) => async (dispatch) => {
  await api.deleteEmployee(id);
  dispatch({ type: "DELETE", payload: id });
};

export const updateEmployee = (form) => async (dispatch) => {
  const res = await api.updateEmployee(form);
  console.log(res);
  const { data } = await staff.getALLStaff();
  dispatch({ type: "GETALL", payload: data });
};
