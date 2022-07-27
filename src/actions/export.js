import * as api from "../apis/export";

export const getAllExportNote = () => async (dispatch) => {
  const { data } = await api.getAllExports();
  let exportDetails = [];
  const getDetail = async (id) => {
    const detail = (await api.getExportById(id)).data;
    exportDetails = exportDetails.concat(detail);
  };
  await Promise.all(data.map((imp) => getDetail(imp.exportId)));
  dispatch({ type: "GETALL", payload: exportDetails });
};

export const addExportNote = (exp) => async (dispatch) => {
  await api.addExportNote(exp);
  const { data } = await api.getAllExports();
  let exportDetails = [];
  const getDetail = async (id) => {
    const detail = (await api.getExportById(id)).data;
    exportDetails = exportDetails.concat(detail);
  };
  await Promise.all(data.map((imp) => getDetail(imp.exportId)));
  dispatch({ type: "GETALL", payload: exportDetails });
};

export const deleteExportNote = (id) => async (dispatch) => {
  await api.deleteExportNote(id);
  dispatch({ type: "DELETE", payload: id });
};

export const updateExportNote = (exp) => async (dispatch) => {
  await api.updateExportNote(exp);
  const { data } = await api.getAllExports();
  let exportDetails = [];
  const getDetail = async (id) => {
    const detail = (await api.getExportById(id)).data;
    exportDetails = exportDetails.concat(detail);
  };
  await Promise.all(data.map((imp) => getDetail(imp.exportId)));
  dispatch({ type: "GETALL", payload: exportDetails });
};
