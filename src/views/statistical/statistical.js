import React, { useEffect, useState } from "react";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { useDispatch, useSelector } from "react-redux";
import { getRevenue } from "actions/revenue";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "./Table";
import { getRevenueByDate } from "actions/revenue";

export default function EmployeeManagementPage() {
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      dateStart: formatDate(dateCreate),
      dateEnd: formatDate(dateEnd),
    };
    console.log(data);
    dispatch(getRevenueByDate(data));
  };
  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };
  const dispatch = useDispatch();
  const revenues = useSelector((state) => state.revenue);
  const [dateCreate, setDateCreate] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  useEffect(() => {
    dispatch(getRevenue());
  }, []);
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <form onSubmit={onSubmit}>
          <LocalizationProvider className="date" dateAdapter={AdapterDateFns}>
            <DatePicker
              label="From Date"
              value={dateCreate}
              onChange={(newValue) => {
                setDateCreate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <LocalizationProvider className="date" dateAdapter={AdapterDateFns}>
            <DatePicker
              label="To Date"
              value={dateEnd}
              onChange={(newValue) => {
                setDateEnd(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button type="submit">Filter</Button>
        </form>
        <Card>
          <CardHeader color="primary"></CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Date", "Revenus", "Benefit"]}
              tableData={revenues.map((rev) => [
                rev.date,
                rev.revenus,
                rev.benefit,
              ])}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
