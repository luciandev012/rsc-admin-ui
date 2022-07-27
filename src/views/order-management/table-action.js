import * as React from "react";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { PropTypes } from "prop-types";
// validation
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux/es/exports";
import { deleteOrder, updateOrder } from "actions/order";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import API from "../../helper/axios";
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
      <Tooltip title="Edit" arrow>
        <Fab
          size="small"
          color="warning"
          aria-label="edit"
          onClick={handleClickOpenEdit}
        >
          <EditIcon />
        </Fab>
      </Tooltip>

      <Dialog
        open={openDialogEdit}
        onClose={handleCloseEdit}
        onSubmit={handleSubmit(onSubmit)}
        disableEscapeKeyDown={false}
        onBackdropClick="false"
      >
        <form>
          <DialogTitle>Edit</DialogTitle>
          <DialogContent>
            <div>
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
            </div>
          </DialogContent>
          <DialogActions>
            <Button type="submit">Save</Button>
            <Button onClick={handleCloseEdit}>Cancel</Button>
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
      <Tooltip title="Delete" arrow>
        <Fab
          size="small"
          color="error"
          aria-label="delete"
          onClick={handleClickOpenDelete}
        >
          <DeleteIcon />
        </Fab>
      </Tooltip>

      <Dialog
        open={openDialogDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete this order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleYesDelete}>Yes</Button>
          <Button onClick={handleCloseDelete}>No</Button>
        </DialogActions>
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
