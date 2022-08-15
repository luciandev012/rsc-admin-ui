import * as React from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { PropTypes } from "prop-types";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
// validation
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { deleteOrder, updateOrder } from "actions/order";
// import InputLabel from "@mui/material/InputLabel";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
import API from "../../helper/axios";

// show information
import Slide from "@mui/material/Slide";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
// import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import { PDFExport } from "@progress/kendo-react-pdf";
import DownloadIcon from "@mui/icons-material/Download";
import { useRef } from "react";
import { getBillByOrder } from "actions/bill";

// import Divider from "@mui/material/Divider";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export function TableEditButton({ data }) {
  // validation
  const { handleSubmit } = useForm();
  //console.log(data);
  const onSubmit = async () => {
    dispatch(
      updateOrder({
        orderId: data.orderId,
        staffId: data.staffId,
        custormerId: data.custormerId,
        dateCreate: data.dateCreate,
        paymentMethodId: data.paymentMethodId,
        status: status,
        totalPrice: data.totalPrice,
        orderdetails: (await getOrderByCustomerId(data.custormerId)).data[0]
          .orderdetails,
      })
    );
    handleCloseEdit();
  };
  const getOrderByCustomerId = (id) =>
    API.get(`/Order/GetAllOrderIncludeOderDetailbyCustomerId?id=${id}`);
  //console.log(errors);
  const dispatch = useDispatch();
  // edit
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
  const [status, setStatus] = React.useState(data.status);

  const handleChange = (event) => {
    const { value } = event.target;
    setStatus(value);
  };
  //const dispatch = useDispatch();

  const handleClickOpenEdit = () => {
    setOpenDialogEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenDialogEdit(false);
  };

  return (
    <>
      {/* <Tooltip title="Update Status" arrow>
        <Fab
          size="small"
          color="warning"
          aria-label="edit"
          onClick={handleClickOpenEdit}
        >
          <EditIcon />
        </Fab>
      </Tooltip> */}

      <Button
        color="warning"
        variant="contained"
        startIcon={<EditIcon />}
        onClick={handleClickOpenEdit}
      >
        Tr?ng thái
      </Button>

      <Dialog
        open={openDialogEdit}
        onClose={handleCloseEdit}
        onSubmit={handleSubmit(onSubmit)}
        disableEscapeKeyDown={false}
        onBackdropClick="false"
      >
        <form>
          <DialogTitle>C?p nh?t tr?ng thái</DialogTitle>
          <DialogContent>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  id="status"
                  name="status"
                  select
                  label="Tr?ng thái"
                  value={status}
                  onChange={handleChange}
                >
                  <MenuItem value={-1}>H?y don hàng</MenuItem>
                  <MenuItem value={1}>Ðã duy?t</MenuItem>
                  <MenuItem value={2}>Ðã xác nh?n</MenuItem>
                  <MenuItem value={3}>Ðã nh?n và thanh toán</MenuItem>
                </TextField>
              </div>
            </Box>
            {/* <div>
              <FormControl sx={{ m: 1, minWidth: 170 }}>
                <InputLabel id="status">Status</InputLabel>
                <Select
                  labelId="status"
                  id="status"
                  value={status}
                  onChange={handleChange}
                  autoWidth
                  label="Status"
                >
                  <MenuItem value={-1}>Cancel order</MenuItem>
                  <MenuItem value={1}>Approved</MenuItem>
                  <MenuItem value={2}>Confirmed</MenuItem>
                  <MenuItem value={3}>Received and paid</MenuItem>
                </Select>
              </FormControl>
            </div> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit}>H?y</Button>
            <Button type="submit">Luu</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export function TableDeleteButton({ data }) {
  // delete
  const [openDialogDelete, setOpenDialogDelete] = React.useState(false);

  const handleClickOpenDelete = () => {
    setOpenDialogDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDialogDelete(false);
  };
  const handleYesDelete = async () => {
    dispatch(deleteOrder(data.orderId));
    setOpenDialogDelete(false);
  };
  const dispatch = useDispatch();
  return (
    <>
      {/* <Tooltip title="Delete Order" arrow>
        <Fab
          size="small"
          color="error"
          aria-label="delete"
          onClick={handleClickOpenDelete}
        >
          <DeleteIcon />
        </Fab>
      </Tooltip> */}

      <Button
        color="error"
        variant="contained"
        startIcon={<DeleteIcon />}
        onClick={handleClickOpenDelete}
      >
        Xóa
      </Button>

      <Dialog
        open={openDialogDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableEscapeKeyDown={false}
        onBackdropClick="false"
      >
        <DialogTitle id="alert-dialog-title">{"Xóa"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            B?n có mu?n xóa don d?t hàng này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>H?y</Button>
          <Button onClick={handleYesDelete}>Luu</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export function BillButton(data) {
  // show information
  const [openShowInformation, setOpenShowInformation] = React.useState(false);
  const dispatch = useDispatch();
  const handleClickOpenShowInformation = () => {
    //console.log(data);
    dispatch(getBillByOrder(data.data.orderId, 2));
    console.log(bill);
    setOpenShowInformation(true);
  };

  const handleCloseShowInformation = () => {
    setOpenShowInformation(false);
  };

  const pdfExportComponent = useRef(null);
  const bill = useSelector((state) => state.bill);
  const handleExportWithComponent = () => {
    pdfExportComponent.current.save();
  };

  return (
    <>
      {/* <Tooltip title="Delete Order" arrow>
        <Fab
          size="small"
          color="error"
          aria-label="delete"
          onClick={handleClickOpenDelete}
        >
          <DeleteIcon />
        </Fab>
      </Tooltip> */}

      <Button
        color="inherit"
        variant="contained"
        startIcon={<ReceiptLongIcon />}
        onClick={handleClickOpenShowInformation}
      >
        Hóa don
      </Button>

      {/* show information */}
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
              Hóa don
            </Typography>
            <DownloadIcon onClick={handleExportWithComponent} />
          </Toolbar>
        </AppBar>
        <PDFExport ref={pdfExportComponent} paperSize="A4">
          <List>
            {bill
              ? bill.map((billDetail, index) => (
                  <div key={index}>
                    <ListItem>
                      <ListItemText
                        primary="Dish name"
                        secondary={billDetail.dishName}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Dish description"
                        secondary={billDetail.dishDescription}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Dish cooking"
                        secondary={billDetail.dishCooking}
                      />
                    </ListItem>
                    <List>
                      {billDetail.dishDetails
                        ? billDetail.dishDetails.map((dish, index) => (
                            <div key={index}>
                              <ListItem>
                                <ListItemText
                                  primary="Product name"
                                  secondary={dish.productName}
                                />
                              </ListItem>
                              <ListItem>
                                <ListItemText
                                  primary="Unit"
                                  secondary={dish.unitName}
                                />
                              </ListItem>
                              <ListItem>
                                <ListItemText
                                  primary="Quantity"
                                  secondary={dish.quantity}
                                />
                              </ListItem>
                            </div>
                          ))
                        : null}
                    </List>
                    <br />
                  </div>
                ))
              : null}
          </List>
        </PDFExport>
      </Dialog>
    </>
  );
}

TableEditButton.propTypes = {
  data: PropTypes.object,
};
TableDeleteButton.propTypes = {
  data: PropTypes.object,
};
BillButton.propTypes = {
  data: PropTypes.object,
};
