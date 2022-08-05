import API from "../helper/axios";

export const getWarning = () => API.get("/Product/WarningQuanityProduct");
