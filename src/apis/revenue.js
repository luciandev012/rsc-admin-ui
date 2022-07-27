import API from "../helper/axios";

export const getRevenue = () => API.get("/Admin/GetRevenue");

export const getRevenueBydate = (req) =>
  API.get(
    `/Admin/GetRevenueByDate?dateStart=${req.dateStart}&dateEnd=${req.dateEnd}`
  );
