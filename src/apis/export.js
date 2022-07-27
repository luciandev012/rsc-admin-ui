import API from "../helper/axios";

export const getAllExports = () => API.get("/Inventory/GetAllExports");

export const getExportById = (id) =>
  API.get(`/Inventory/GetAllExportDetailsByExportid?id=${id}`);

export const addExportNote = (exp) => API.post("/Inventory/AddExport", exp);

export const deleteExportNote = (id) =>
  API.delete(`/Inventory/DeleteExport?id=${id}`);

export const updateExportNote = (exp) =>
  API.post("/Inventory/UpdateExport", exp);
