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
import { deleteImportNote } from "actions/import";
import { updateImportNote } from "actions/import";

export function TableEditButton({ data }) {
  // edit
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
  const [importNotes, setImportNotes] = React.useState(data.importNoteDetails);

  const { handleSubmit } = useForm();
  const onSubmit = async () => {
    const putData = {
      importNoteId: data.importNoteId,
      managementId: JSON.parse(localStorage.user).id,
      importNoteDetailModelViews: importNotes.map((imp) => {
        return {
          importNoteDetailId: imp.importNoteDetailId,
          importNoteId: imp.importNoteId,
          price: imp.price,
          quanlity: imp.quanlity,
          productId: imp.productId,
        };
      }),
    };
    dispatch(updateImportNote(putData));
    handleCloseEdit();
  };
  React.useEffect(() => {
    setImportNotes(data.importNoteDetails);
  }, [data]);

  const dispatch = useDispatch();

  const handleClickOpenEdit = () => {
    setOpenDialogEdit(true);
  };
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...importNotes];
    list[index][name] = value;
    setImportNotes(list);
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
          {console.log(data.importNoteDetails)}
          <DialogContent>
            {importNotes
              ? importNotes.map((imp, index) => (
                  <div key={index}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="productId"
                      label="Product Id"
                      type="text"
                      name="productId"
                      value={imp.productId}
                      variant="outlined"
                      fullWidth
                      disabled={true}
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="price"
                      label="Price"
                      type="text"
                      name="price"
                      value={imp.price}
                      onChange={(e) => handleChange(e, index)}
                      variant="outlined"
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="quantity"
                      label="Quantity"
                      type="text"
                      name="quanlity"
                      value={imp.quanlity}
                      onChange={(e) => handleChange(e, index)}
                      variant="outlined"
                    />
                  </div>
                ))
              : null}
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
    dispatch(deleteImportNote(data.importNoteId));
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
            Do you want to delete this import?
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
