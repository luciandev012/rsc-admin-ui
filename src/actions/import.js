import * as api from "../apis/import";

export const getAllImportNote = () => async (dispatch) => {
  const { data } = await api.getAllImport();
  const getDetail = async (imp) => {
    const detail = (await api.getImportNoteDetails(imp.importNoteId)).data;
    imp.importNoteDetails = detail;
    return imp;
  };
  await Promise.all(data.map((imp) => getDetail(imp)));
  dispatch({ type: "GETALLIMP", payload: data });
};

export const addImportNote = (importNote) => async (dispatch) => {
  await api.addImportNote(importNote);
  const { data } = await api.getAllImport();
  const getDetail = async (imp) => {
    const detail = (await api.getImportNoteDetails(imp.importNoteId)).data;
    imp.importNoteDetails = detail;
    return imp;
  };
  await Promise.all(data.map((imp) => getDetail(imp)));
  dispatch({ type: "GETALLIMP", payload: data });
};

export const deleteImportNote = (id) => async (dispatch) => {
  await api.deleteImportNote(id);
  dispatch({ type: "DELETEIMP", payload: id });
};

export const updateImportNote = (importNote) => async (dispatch) => {
  await api.updateImportNote(importNote);
  const { data } = await api.getAllImport();
  const getDetail = async (imp) => {
    const detail = (await api.getImportNoteDetails(imp.importNoteId)).data;
    imp.importNoteDetails = detail;
    return imp;
  };
  await Promise.all(data.map((imp) => getDetail(imp)));
  dispatch({ type: "GETALLIMP", payload: data });
};
