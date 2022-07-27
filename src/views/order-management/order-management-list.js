import React, { useEffect, useState } from "react";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "./Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

// angular UI
import Stack from "@mui/material/Stack";

// paging
import TablePagination from "@mui/material/TablePagination";

// validation
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "actions/order.js";

export default function OrderManagementPage() {
  // validation

  // page
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(getAllOrder());
  }, []);
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Stack direction="row" marginLeft="15px"></Stack>

        <Card>
          <CardHeader color="primary"></CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={[
                "ID",
                "Date created",
                "Status",
                "Total price",
                "Actions",
              ]}
              tableData={orders.map((order) => [
                order.orderId,
                order.dateCreate,
                order.status,
                order.totalPrice,
              ])}
              editData={orders}
            />
          </CardBody>
          <TablePagination
            component="div"
            count={100}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </GridItem>
    </GridContainer>
  );
}
