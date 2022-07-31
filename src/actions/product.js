import * as api from "../apis/product";

export const getAllProducts = () => async (dispatch) => {
  const { data } = await api.getAllProducts();
  dispatch({ type: "GETPRODUCTS", payload: data });
};

export const deleteProduct = (id) => async (dispatch) => {
  await api.deleteProduct(id);
  dispatch({ type: "DELETE", payload: id });
};
export const addProduct = (form) => async (dispatch) => {
  const res = await api.addProduct(form);
  if (res.data.length < 3) {
    alert("Add product fail: " + res.data[0]);
  } else {
    const { data } = await api.getAllProducts();
    dispatch({ type: "GETPRODUCTS", payload: data });
  }
};

export const updateProduct = (form) => async (dispatch) => {
  const res = await api.updateProduct(form);
  if (res.data.length < 3) {
    alert("Update product fail: " + res.data[0] + " " + res.data[1]);
  } else {
    const { data } = await api.getAllProducts();
    dispatch({ type: "GETPRODUCTS", payload: data });
  }
};
