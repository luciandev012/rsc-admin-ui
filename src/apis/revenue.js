import API from "../helper/axios";

export const getRevenue = () => API.get("/Manager/GetRevenue");

export const getRevenueBydate = (req) =>
  API.get(
    `/Manager/GetRevenueByDate?dateStart=${req.dateStart}&dateEnd=${req.dateEnd}`
  );
