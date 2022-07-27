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
import { Checkbox, FormControlLabel } from "@mui/material";
import { useDispatch } from "react-redux/es/exports";
import { updateUnit } from "actions/unit";
import { deleteUnit } from "actions/unit";
//import { getAllUnit } from "actions/unit";

export function TableEditButton({ data }) {
  // validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // edit
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
  const [name, setName] = React.useState(data.name);
  const [disabled, setDisabled] = React.useState(data.disabled);
  const dispatch = useDispatch();

  const handleClickOpenEdit = () => {
    setOpenDialogEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenDialogEdit(false);
  };

  const onSubmit = async () => {
    let putData = {
      unitId: data.unitId,
      name: name,
      disabled: disabled,
    };
    dispatch(updateUnit(putData));
    handleCloseEdit();
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
      >
        <form>
          <DialogTitle>Edit</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              name="name"
              {...register("name", {
                required: "Name is required.",
              })}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              onChange={(val) => setName(val.target.value)}
              value={name}
              variant="outlined"
              fullWidth
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={disabled}
                  onChange={() => setDisabled(!disabled)}
                  name="disabled"
                />
              }
              label="Disable"
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
    dispatch(deleteUnit(data.unitId));
    setOpenDialogDelete(false);
    //dispatch(getAllUnit());
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
            Do you want to delete {data.name}?
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
