import * as React from "react";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { PropTypes } from "prop-types";
// validation
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux/es/exports";
import { deleteExportNote, updateExportNote } from "actions/export";

export function TableEditButton({ data }) {
  // validation
  const { handleSubmit } = useForm();
  //console.log(data);
  const onSubmit = async () => {
    const putData = {
      exportId: data.exportId,
      managementId: JSON.parse(localStorage.user).id,
      exportDetailModelViews: [
        {
          exportDetailId: data.exportDetailId,
          exportId: data.exportId,
          price: exportNote.price,
          quanlity: exportNote.quanlity,
          productId: data.productId,
        },
      ],
    };
    dispatch(updateExportNote(putData));
    handleCloseEdit();
  };

  //console.log(errors);
  const dispatch = useDispatch();
  // edit
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
  const [exportNote, setExportNote] = React.useState(data);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setExportNote((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

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
            <TextField
              autoFocus
              margin="dense"
              id="price"
              label="Price"
              type="text"
              name="price"
              value={exportNote.price}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="dense"
              id="quantity"
              label="Quantity"
              type="text"
              name="quanlity"
              value={exportNote.quanlity}
              onChange={handleChange}
              variant="outlined"
            />
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
    dispatch(deleteExportNote(data.exportId));
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
            Do you want to delete this export?
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
