import React, { useEffect } from "react";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { useDispatch, useSelector } from "react-redux";
import Table from "./Table";
import { getAllCustomer } from "actions/customer";

export default function EmployeeManagementPage() {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.customer);
  useEffect(() => {
    dispatch(getAllCustomer());
  }, []);
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary"></CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={[
                "Full name",
                "Email Address",
                "Phone Number",
                "Date of birth",
                "Personal Id",
                "Address",
                "Avatar",
                "Actions",
              ]}
              tableData={employees.map((employee) => [
                employee.fullname,
                employee.email,
                employee.phonenumber,
                employee.dateofbirth,
                employee.personalId,
                employee.address,
                employee.urlAvatar,
              ])}
              editData={employees}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
