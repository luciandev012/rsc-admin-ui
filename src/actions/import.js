import * as api from "../apis/import";

export const getAllImportNote = () => async (dispatch) => {
  const { data } = await api.getAllImport();
  let importNotes = [];
  const getDetail = async (id) => {
    const detail = (await api.getImportNoteDetails(id)).data;
    importNotes = importNotes.concat(detail);
  };
  await Promise.all(data.map((imp) => getDetail(imp.importNoteId)));
  console.log(importNotes);
  dispatch({ type: "GETALL", payload: importNotes });
};

export const addImportNote = (importNote) => async (dispatch) => {
  await api.addImportNote(importNote);
  const { data } = await api.getAllImport();
  let importNotes = [];
  const getDetail = async (id) => {
    const detail = (await api.getImportNoteDetails(id)).data;
    importNotes = importNotes.concat(detail);
  };
  await Promise.all(data.map((imp) => getDetail(imp.importNoteId)));
  console.log(importNotes);
  dispatch({ type: "GETALL", payload: importNotes });
};

export const deleteImportNote = (id) => async (dispatch) => {
  await api.deleteImportNote(id);
  dispatch({ type: "DELETE", payload: id });
};

export const updateImportNote = (importNote) => async (dispatch) => {
  await api.updateImportNote(importNote);
  const { data } = await api.getAllImport();
  let importNotes = [];
  const getDetail = async (id) => {
    const detail = (await api.getImportNoteDetails(id)).data;
    importNotes = importNotes.concat(detail);
  };
  await Promise.all(data.map((imp) => getDetail(imp.importNoteId)));
  console.log(importNotes);
  dispatch({ type: "GETALL", payload: importNotes });
};
