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
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { getAllProducts } from "actions/product";
import { getAllExportNote, addExportNote } from "actions/export";

export default function ExportManagementPage() {
  // validation
  const { handleSubmit } = useForm();
  const onSubmit = () => {
    const data = {
      managementId: JSON.parse(localStorage.user).id,
      exportDate: formatDate(dateCreate),
      description: exportNote.description,
      exportDetailModelViews: listProduct.map((product) => {
        return {
          productId: product.productId,
          price: product.price,
          quanlity: product.quantity,
        };
      }),
    };
    dispatch(addExportNote(data));
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
    setExportNote({
      description: "",
    });
    setOpen(false);
  };
  const dispatch = useDispatch();
  const exports = useSelector((state) => state.exportP);
  const [exportNote, setExportNote] = useState({
    description: "",
  });
  const [productId, setProductId] = useState("");
  const [dateCreate, setDateCreate] = useState(new Date());
  const products = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllExportNote());
  }, []);
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...listProduct];
    list[index][name] = value;
    setListProduct(list);
  };
  const handleChangeDes = (event) => {
    const { name, value } = event.target;
    setExportNote((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };
  const [listProduct, setListProduct] = useState([]);
  const handleChangeSelect = (event) => {
    setListProduct([
      ...listProduct,
      {
        productId: event.target.value,
        price: 0,
        quantity: 0,
        productName: products.filter(
          (p) => p.productId == event.target.value
        )[0].productName,
      },
    ]);
    setProductId(event.target.value);
  };
  const handleDelete = (index) => {
    const list = [...listProduct];
    list.splice(index, 1);
    setListProduct(list);
  };
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
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Product</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={productId}
                    label="Product"
                    name="productName"
                    onChange={handleChangeSelect}
                  >
                    {products.map((product, key) => (
                      <MenuItem
                        value={product.productId}
                        name={product.productName}
                        key={key}
                      >
                        {product.productName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              {listProduct.map((product, index) => (
                <div key={index}>
                  <TextField
                    margin="dense"
                    id="price"
                    label="Product Name"
                    type="text"
                    name="name"
                    fullWidth
                    value={product.productName}
                    disabled={true}
                    variant="outlined"
                  />
                  <TextField
                    margin="dense"
                    id="price"
                    label="Price"
                    type="text"
                    name="price"
                    value={product.price}
                    onChange={(e) => handleChange(e, index)}
                    variant="outlined"
                  />
                  <TextField
                    key={index}
                    margin="dense"
                    id="quantity"
                    label="Quantity"
                    type="text"
                    name="quantity"
                    value={product.quantity}
                    onChange={(e) => handleChange(e, index)}
                    variant="outlined"
                  />
                  <Button type="button" onClick={() => handleDelete(index)}>
                    Remove
                  </Button>
                </div>
              ))}
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
              <TextField
                margin="dense"
                id="description"
                label="Description"
                type="text"
                name="description"
                value={exportNote.description}
                onChange={handleChangeDes}
                variant="outlined"
              />
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
              tableHead={["ID", "Export date", "Description", "Actions"]}
              tableData={exports.map((imp) => [
                imp.exportId,
                imp.exportDate,
                imp.description,
              ])}
              editData={exports}
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
