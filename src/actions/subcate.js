import axios from "../helper/axios";

export const getAllSubCate = () => async (dispatch) => {
  axios
    .get("/Product/GetAllSubcategories")
    .then((result) => {
      //console.log(result);
      dispatch({ type: "GETALLSUBCATE", payload: result.data });
    })
    .catch((err) => console.log(err));
};
