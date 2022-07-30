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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
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
import { getAllDiscount } from "actions/discount";
import { addDiscount } from "actions/discount";

export default function DiscountManagementPage() {
  // validation
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = () => {
    const data = {
      discountName: disc.discountName,
      discountPercent: disc.discountPercent,
      dateCreate: formatDate(dateCreate),
      dateEnd: formatDate(dateEnd),
    };
    dispatch(addDiscount(data));
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
    setDisc({
      discountName: "",
      discountPercent: "",
    });
    setOpen(true);
  };

  // close dialog
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const discounts = useSelector((state) => state.discount);
  const [disc, setDisc] = useState({
    discountName: "",
    discountPercent: "",
  });
  const [dateCreate, setDateCreate] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDisc((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    dispatch(getAllDiscount());
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
            <DialogTitle>Add New</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                id="discountName"
                label="Discount name"
                type="text"
                name="discountName"
                {...register("discountName", {
                  required: "Discount name is required.",
                })}
                error={Boolean(errors.discountName)}
                helperText={errors.discountName?.message}
                value={disc.discountName}
                onChange={handleChange}
                variant="outlined"
              />
              <TextField
                margin="dense"
                id="discountPercent"
                label="Percent"
                type="text"
                name="discountPercent"
                {...register("discountPercent", {
                  required: "Discount percent is required.",
                })}
                error={Boolean(errors.discountPercent)}
                helperText={errors.discountPercent?.message}
                value={disc.discountPercent}
                onChange={handleChange}
                variant="outlined"
              />
              <LocalizationProvider
                className="date"
                dateAdapter={AdapterDateFns}
              >
                <DatePicker
                  label="Create Date"
                  value={dateCreate}
                  onChange={(newValue) => {
                    setDateCreate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <LocalizationProvider
                className="date"
                dateAdapter={AdapterDateFns}
              >
                <DatePicker
                  label="End Date"
                  value={dateEnd}
                  onChange={(newValue) => {
                    setDateEnd(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
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
              tableHead={["ID", "Name", "End date", "Percent", "Actions"]}
              tableData={discounts.map((discount) => [
                discount.discountId,
                discount.discountName,
                discount.dateEnd,
                discount.discountPercent,
              ])}
              editData={discounts}
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
