import React, { useEffect, useState } from "react";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "./Table";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

// angular UI
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

// paging
import TablePagination from "@mui/material/TablePagination";

// dialog
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

// validation
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployee } from "actions/employee";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Checkbox, FormControlLabel } from "@mui/material";
import "./style.css";
import { addEmployee } from "actions/employee";

export default function EmployeeManagementPage() {
  // validation
  const {
    handleSubmit,
    register,
    formState: { errors },
    resetField,
  } = useForm();
  const onSubmit = (data) => {
    const fd = new FormData();
    fd.append("fileAvatar", image);
    fd.append("dateOfBirth", formatDate(dateOfBirth));
    fd.append("fullname", data.fullname);
    fd.append("address", data.address);
    fd.append("phonenumber", data.phonenumber);
    fd.append("email", data.email);
    fd.append("username", data.username);
    fd.append("password", data.password);
    fd.append("cwtId", 1);
    fd.append("personalId", data.personalId);
    fd.append("gender", disabled);
    dispatch(addEmployee(fd));
    handleClose();
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
  // page
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // dialog
  const [open, setOpen] = React.useState(false);

  // open dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // close dialog
  const handleClose = () => {
    resetField("fullname");
    resetField("phonenumber");
    resetField("email");
    resetField("address");
    resetField("personalId");
    resetField("username");
    resetField("password");
    setOpen(false);
  };
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employee);
  // const [employ, setEmploy] = useState({
  //   fullname: "",
  //   phonenumber: "",
  //   email: "",
  //   address: "",
  //   gender: "",
  //   personalId: "",
  //   cwtId: 1,
  //   username: "",
  //   password: "",
  // });
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [image, setImage] = useState("");
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };
  const [disabled, setDisabled] = useState(false);
  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setEmploy((prevValue) => {
  //     return {
  //       ...prevValue,
  //       [name]: value,
  //     };
  //   });
  // };
  useEffect(() => {
    dispatch(getAllEmployee());
  }, []);
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Stack direction="row" marginLeft="15px">
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={handleClickOpen}
          >
            <span>Add New</span>
          </Button>
        </Stack>

        <Dialog
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmit(onSubmit)}
          disableEscapeKeyDown={false}
          onBackdropClick="false"
        >
          <form>
            <DialogTitle>Add New Employee</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="fullname"
                label="Full name"
                type="text"
                name="fullname"
                {...register("fullname", {
                  required: "Full name is required.",
                })}
                error={!!errors.fullname}
                helperText={errors.fullname?.message}
                // value={employ.fullname}
                // onChange={handleChange}
                variant="outlined"
              />
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email"
                type="text"
                name="email"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                // value={employ.email}
                // onChange={handleChange}
                variant="outlined"
              />
              <TextField
                autoFocus
                margin="dense"
                id="username"
                label="User Name"
                type="text"
                name="username"
                {...register("username", {
                  required: "Username is required.",
                })}
                error={!!errors.username}
                helperText={errors.username?.message}
                // value={employ.username}
                // onChange={handleChange}
                variant="outlined"
              />
              <TextField
                margin="dense"
                id="password"
                label="Password"
                type="password"
                name="password"
                {...register("password", {
                  required: "Password is required.",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/i,
                    message:
                      "Password must have Uppercase, Lowercase, Special Char, Number and minLength: 6",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                // value={employ.password}
                // onChange={handleChange}
                variant="outlined"
              />
              <TextField
                margin="dense"
                id="address"
                label="Address"
                type="text"
                name="address"
                {...register("address", {
                  required: "Address is required.",
                })}
                error={!!errors.address}
                helperText={errors.address?.message}
                // value={employ.address}
                // onChange={handleChange}
                variant="outlined"
              />
              <TextField
                margin="dense"
                id="personalId"
                label="Personal Id"
                type="text"
                name="personalId"
                {...register("personalId", {
                  required: "PersonalId is required.",
                })}
                error={!!errors.personalId}
                helperText={errors.personalId?.message}
                // value={employ.personalId}
                // onChange={handleChange}
                variant="outlined"
              />
              <LocalizationProvider
                className="date"
                dateAdapter={AdapterDateFns}
              >
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
                {...register("phonenumber", {
                  required: "Phone number is required.",
                  pattern: {
                    value: /^[0-9]{10,}$/i,
                    message: "Invalid phone number",
                  },
                })}
                error={!!errors.phonenumber}
                helperText={errors.phonenumber?.message}
                // value={employ.phonenumber}
                // onChange={handleChange}
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
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </form>
        </Dialog>

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
          <TablePagination
            component="div"
            count={100}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </GridItem>
    </GridContainer>
  );
}
