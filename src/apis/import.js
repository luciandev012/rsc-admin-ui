import API from "../helper/axios";

export const getAllImport = () => API.get("/Inventory/GetAllImpotNote");

export const addImportNote = (importNote) =>
  API.post("/Inventory/AddImport", importNote);

export const deleteImportNote = (id) =>
  API.delete(`/Inventory/DeleteImportNote?id=${id}`);

export const updateImportNote = (importNote) => {
  API.post("/Inventory/UpdateImportNote", importNote);
};
export const getImportNoteDetails = (id) =>
  API.get(`/Inventory/GetAllImportNoteDetailsByImporNotetid?id=${id}`);
