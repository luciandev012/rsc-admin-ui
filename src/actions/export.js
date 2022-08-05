import * as api from "../apis/export";

export const getAllExportNote = () => async (dispatch) => {
  const { data } = await api.getAllExports();
  const getDetail = async (imp) => {
    const detail = (await api.getExportById(imp.exportId)).data;
    imp.exportDetails = detail;
    return imp;
  };
  await Promise.all(data.map((imp) => getDetail(imp)));
  dispatch({ type: "GETALLEXP", payload: data });
};

export const addExportNote = (exp) => async (dispatch) => {
  await api.addExportNote(exp);
  const { data } = await api.getAllExports();
  const getDetail = async (imp) => {
    const detail = (await api.getExportById(imp.exportId)).data;
    imp.exportDetails = detail;
    return imp;
  };
  await Promise.all(data.map((imp) => getDetail(imp)));
  dispatch({ type: "GETALLEXP", payload: data });
};

export const deleteExportNote = (id) => async (dispatch) => {
  await api.deleteExportNote(id);
  dispatch({ type: "DELETEEXP", payload: id });
};

export const updateExportNote = (exp) => async (dispatch) => {
  await api.updateExportNote(exp);
  const { data } = await api.getAllExports();
  const getDetail = async (imp) => {
    const detail = (await api.getExportById(imp.exportId)).data;
    imp.exportDetails = detail;
    return imp;
  };
  await Promise.all(data.map((imp) => getDetail(imp)));
  dispatch({ type: "GETALLEXP", payload: data });
};
