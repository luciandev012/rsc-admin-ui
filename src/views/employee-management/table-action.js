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
import AddIcon from "@material-ui/icons/Add";
import { deleteEmployee } from "actions/employee";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Checkbox, FormControlLabel } from "@mui/material";
import { updateEmployee } from "actions/employee";

export function TableEditButton({ data }) {
  // validation
  const { handleSubmit } = useForm();
  //console.log(data);

  //console.log(errors);

  // edit
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
  const dispatch = useDispatch();
  const [employ, setEmploy] = React.useState(data);
  const [dateOfBirth, setDateOfBirth] = React.useState(new Date());
  const [image, setImage] = React.useState("");
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };
  const [disabled, setDisabled] = React.useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmploy((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleClickOpenEdit = () => {
    setOpenDialogEdit(true);
  };

  const handleCloseEdit = () => {
    setEmploy(data);
    setOpenDialogEdit(false);
  };

  const onSubmit = () => {
    const fd = new FormData();
    fd.append("fileAvatar", image);
    fd.append("id", employ.id);
    fd.append("dateOfBirth", formatDate(dateOfBirth));
    fd.append("fullname", employ.fullname);
    fd.append("address", employ.address);
    fd.append("phonenumber", employ.phonenumber);
    fd.append("email", employ.email);
    fd.append("cwtId", 1);
    fd.append("personalId", employ.personalId);
    fd.append("gender", disabled);
    dispatch(updateEmployee(fd));
    handleCloseEdit();
  };

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
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
              id="fullname"
              label="Full name"
              type="text"
              name="fullname"
              value={employ.fullname}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="text"
              name="email"
              value={employ.email}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              margin="dense"
              id="address"
              label="Address"
              type="text"
              name="address"
              value={employ.address}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              margin="dense"
              id="personalId"
              label="Personal Id"
              type="text"
              name="personalId"
              value={employ.personalId}
              onChange={handleChange}
              variant="outlined"
            />
            <LocalizationProvider className="date" dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date of birth"
                value={dateOfBirth}
                onChange={(newValue) => {
                  setDateOfBirth(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <TextField
              margin="dense"
              id="phonenumber"
              label="Phone number"
              type="text"
              name="phonenumber"
              value={employ.phonenumber}
              onChange={handleChange}
              variant="outlined"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={disabled}
                  onChange={() => setDisabled(!disabled)}
                  name="disabled"
                />
              }
              label="Gender: tick for Male"
            />
            <label htmlFor="upload-photo">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                onChange={handleImage}
              />
              <Fab
                color="secondary"
                size="small"
                component="span"
                aria-label="add"
                variant="extended"
              >
                <AddIcon /> Upload photo
              </Fab>
            </label>
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
    dispatch(deleteEmployee(data.id));
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
            Do you want to delete {data.fullname}?
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
