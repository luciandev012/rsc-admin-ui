import * as api from "../apis/brand";

export const getAllBrand = () => async (dispatch) => {
  try {
    const { data } = await api.getAllBrand();
    dispatch({ type: "GETBRANDS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addBrand = (brand) => async (dispatch) => {
  const { status } = await api.createBrand(brand);
  if (status == 200) {
    dispatch({ type: "CREATE", payload: brand });
  }
};

export const updateBrand = (brand) => async (dispatch) => {
  await api.updateBrand(brand);
  console.log(brand);
  dispatch({ type: "UPDATE", payload: brand });
  //getAllBrand();
};

export const deleteBrand = (id) => async (dispatch) => {
  await api.deleteBrand(id);
  dispatch({ type: "DELETE", payload: id });
};
