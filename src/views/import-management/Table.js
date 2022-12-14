import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// import Tooltip from "@material-ui/core/Tooltip";
// import IconButton from "@material-ui/core/IconButton";

// import Edit from "@material-ui/icons/Edit";
// import Close from "@material-ui/icons/Close";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import { TableDeleteButton, TableEditButton } from "./table-action";
import Stack from "@mui/material/Stack";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, editData } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <>
                    <TableCell
                      className={
                        classes.tableCell + " " + classes.tableHeadCell
                      }
                      key={key}
                    >
                      {prop}
                    </TableCell>
                  </>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        {tableData !== undefined ? (
          <TableBody>
            {tableData.map((prop, key) => {
              return (
                // Attribute
                <TableRow key={key} className={classes.tableBodyRow}>
                  {prop.map((prop, key) => {
                    if (key != 5) {
                      return (
                        <TableCell className={classes.tableCell} key={key}>
                          {prop}
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell className={classes.tableCell} key={key}>
                          <Avatar src={prop} />
                        </TableCell>
                      );
                    }
                  })}

                  {/* Actions */}
                  <TableCell className={classes.tableCell} key={key}>
                    <Stack direction="row" spacing={0.5}>
                      {editData ? (
                        <>
                          <TableEditButton data={editData[key]} />
                          <TableDeleteButton data={editData[key]} />
                        </>
                      ) : null}
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        ) : (
          <TableBody>
            {tableData.map((prop, key) => {
              return (
                // Attribute
                <TableRow key={key} className={classes.tableBodyRow}>
                  {prop.map((prop, key) => {
                    return (
                      <TableCell className={classes.tableCell} key={key}>
                        {prop}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  editData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
