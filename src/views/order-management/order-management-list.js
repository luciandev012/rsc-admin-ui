import React, { useEffect } from "react";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "./Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

// angular UI
import moment from "moment";
// import AddCircleIcon from "@mui/icons-material/AddCircle";

// validation
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "actions/order.js";

export default function OrderManagementPage() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(getAllOrder());
  }, []);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="warning"></CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="warning"
              tableHead={["ID", "Ngày tạo", "Trạng thái", "Tổng giá", ""]}
              tableData={orders.map((order) => [
                order.orderId,
                moment(order.dateCreate).format("MM/DD/YYYY"),
                order.status,
                order.totalPrice,
              ])}
              editData={orders}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
