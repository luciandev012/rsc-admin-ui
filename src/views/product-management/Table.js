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
import {
  TableAddBarCodeButton,
  TableAddQrCodeButton,
  TableDeleteButton,
  TableEditButton,
} from "./table-action";
import Stack from "@mui/material/Stack";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles(styles);

// show information
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
// import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, editData } = props;

  // show information
  const [openShowInformation, setOpenShowInformation] = React.useState(false);

  const handleClickOpenShowInformation = (key) => {
    setDetail(editData[key]);
    setOpenShowInformation(true);
  };
  const [detail, setDetail] = React.useState({});
  const handleCloseShowInformation = () => {
    setOpenShowInformation(false);
  };
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
            {tableData.map((prop, fkey) => {
              return (
                // Attribute
                <TableRow hover key={fkey} className={classes.tableBodyRow}>
                  {prop.map((prop, key) => {
                    if (key != 3) {
                      return (
                        <TableCell
                          className={classes.tableCell}
                          key={key}
                          onClick={() => handleClickOpenShowInformation(fkey)}
                        >
                          {prop}
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell
                          className={classes.tableCell}
                          key={key}
                          onClick={() => handleClickOpenShowInformation(fkey)}
                        >
                          <Avatar src={prop} />
                        </TableCell>
                      );
                    }
                  })}

                  {/* Actions */}
                  <TableCell className={classes.tableCell} key={fkey}>
                    <Stack direction="row" spacing={0.5}>
                      <TableEditButton data={editData[fkey]} />
                      <TableDeleteButton data={editData[fkey]} />
                      <TableAddQrCodeButton data={editData[fkey]} />
                      <TableAddBarCodeButton data={editData[fkey]} />
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        ) : (
          <TableBody>
            {tableData.map((prop, fkey) => {
              return (
                // Attribute
                <TableRow key={fkey} className={classes.tableBodyRow}>
                  {prop.map((prop, key) => {
                    return (
                      <TableCell
                        className={classes.tableCell}
                        key={key}
                        onClick={() => handleClickOpenShowInformation(fkey)}
                      >
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

      <Dialog
        fullScreen
        open={openShowInformation}
        onClose={handleCloseShowInformation}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseShowInformation}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Information
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <ListItemText primary="ID" secondary="1" />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Product Name"
              secondary={detail.productName}
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Product Code"
              secondary={detail.productCode}
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Product Describe"
              secondary={detail.productDescribe}
            />
          </ListItem>

          <ListItem>
            <ListItemText primary="Price" secondary={detail.price} />
          </ListItem>

          <ListItem>
            <ListItemText primary="Quantity" secondary={detail.quantity} />
          </ListItem>
        </List>
      </Dialog>
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
