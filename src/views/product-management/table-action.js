import * as React from "react";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import QrCodeIcon from "@mui/icons-material/QrCode";
import CropFreeIcon from "@mui/icons-material/CropFree";
import Tooltip from "@mui/material/Tooltip";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { PropTypes } from "prop-types";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
// validation
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { deleteProduct, updateProduct } from "actions/product";
import AddIcon from "@material-ui/icons/Add";
import { getAllUnit } from "actions/unit";
import { getAllSubCate } from "actions/subcate";
import { getAllDiscount } from "actions/discount";
import * as api from "../../apis/product";

export function TableEditButton({ data }) {
  // validation
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  //console.log(data);

  //console.log(errors);

  // edit
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
  const units = useSelector((state) => state.unit);
  const subcates = useSelector((state) => state.subcate);
  const discounts = useSelector((state) => state.discount);
  const [unitId, setUnitId] = React.useState(data.unitId);
  const [subCateId, setSubCateId] = React.useState(data.subCategoryId);
  const [discountId, setDiscountId] = React.useState(data.discountId);
  React.useEffect(() => {
    dispatch(getAllUnit());
    dispatch(getAllSubCate());
    dispatch(getAllDiscount());
  }, []);
  const handleChangeUnit = (event) => {
    setUnitId(event.target.value);
  };
  const handleChangeSubcate = (event) => {
    setSubCateId(event.target.value);
  };
  const handleChangeDiscount = (event) => {
    setDiscountId(event.target.value);
  };
  const [image, setImage] = React.useState("");
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };
  const dispatch = useDispatch();

  const handleClickOpenEdit = () => {
    setValue("productName", data.productName);
    setValue("productCode", data.productCode);
    setValue("price", data.price);
    setValue("quantity", data.quantity);
    setValue("productDescribe", data.productDescribe);
    setOpenDialogEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenDialogEdit(false);
  };

  const onSubmit = async (pData) => {
    const fd = new FormData();
    fd.append("files", image);
    fd.append("productName", pData.productName);
    fd.append("productCode", pData.productCode);
    fd.append("price", pData.price);
    fd.append("quantity", pData.quantity);
    fd.append("unitId", unitId);
    fd.append("subCategoryId", subCateId);
    fd.append("discountId", discountId);
    fd.append("productId", data.productId);
    fd.append("productDescribe", data.productDescribe);
    dispatch(updateProduct(fd));
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
              id="productName"
              label="Product Name"
              type="text"
              name="productName"
              {...register("productName", {
                required: "Product name is required.",
              })}
              error={!!errors.productName}
              helperText={errors.productName?.message}
            />
            <TextField
              margin="dense"
              id="productCode"
              label="Product Code"
              type="text"
              name="productCode"
              {...register("productCode", {
                required: "Product code is required.",
              })}
              error={!!errors.productCode}
              helperText={errors.productCode?.message}
              variant="outlined"
            />
            <TextField
              margin="dense"
              id="productDescribe"
              label="Product Describe"
              type="text"
              name="productDescribe"
              {...register("productDescribe", {
                required: "Product describe is required.",
              })}
              error={!!errors.productDescribe}
              helperText={errors.productDescribe?.message}
              variant="outlined"
            />
            <TextField
              margin="dense"
              id="price"
              label="Price"
              type="text"
              name="price"
              {...register("price", {
                required: "Price is required.",
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
              variant="outlined"
            />
            <TextField
              margin="dense"
              id="quantity"
              label="Quantity"
              type="text"
              name="quantity"
              {...register("quantity", {
                required: "Price is required.",
              })}
              error={!!errors.quantity}
              helperText={errors.quantity?.message}
              // value={product.quantity}
              // onChange={handleChange}
              variant="outlined"
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
            <div style={{ display: "flex", marginTop: "20px" }}>
              <Box sm={{ minWidth: 120 }} style={{ width: "100px" }}>
                <FormControl>
                  <InputLabel id="demo-simple-select-label">Unit</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={unitId}
                    label="Unit"
                    name="unitId"
                    onChange={handleChangeUnit}
                  >
                    {units
                      ? units.map((unit, key) => (
                          <MenuItem
                            value={unit.unitId}
                            name={unit.name}
                            key={key}
                          >
                            {unit.name}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </FormControl>
              </Box>
              <Box sm={{ minWidth: 120 }} style={{ width: "100px" }}>
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    Subcategory
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={subCateId}
                    label="Subcategory"
                    name="subCateId"
                    onChange={handleChangeSubcate}
                  >
                    {subcates
                      ? subcates.map((sub, key) => (
                          <MenuItem
                            value={sub.subCategoryId}
                            name={sub.subCategoryName}
                            key={key}
                          >
                            {sub.subCategoryName}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </FormControl>
              </Box>
              <Box
                sm={{ minWidth: 120 }}
                style={{ width: "100px", paddingLeft: "50px" }}
              >
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    Discount
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={discountId}
                    label="Discount"
                    name="discountId"
                    onChange={handleChangeDiscount}
                  >
                    {discounts
                      ? discounts.map((dis, key) => (
                          <MenuItem
                            value={dis.discountId}
                            name={dis.discountName}
                            key={key}
                          >
                            {dis.discountName}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </FormControl>
              </Box>
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
    dispatch(deleteProduct(data.productId));
    setOpenDialogDelete(false);
  };
  const dispatch = useDispatch();
  return (
    <>
      <Tooltip title="delete" arrow>
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
            Do you want to delete {data.productName}?
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

export function TableAddQRButton(/*{ data }*/) {
  // delete
  const [openDialogAddQR, setOpenDialogAddQR] = React.useState(false);

  const handleClickOpenAddQR = () => {
    setOpenDialogAddQR(true);
  };

  const handleCloseAddQR = () => {
    setOpenDialogAddQR(false);
  };
  const handleYesAddQR = async () => {
    // dispatch(deleteProduct(data.productId));
    setOpenDialogAddQR(false);
  };
  // const dispatch = useDispatch();
  return (
    <>
      <Tooltip title="addQR" arrow>
        <Fab
          size="small"
          color="inherit"
          aria-label="addQR"
          onClick={handleClickOpenAddQR}
        >
          <QrCodeIcon />
        </Fab>
      </Tooltip>

      <Dialog
        open={openDialogAddQR}
        onClose={handleCloseAddQR}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableEscapeKeyDown={false}
        onBackdropClick="false"
      >
        <DialogTitle id="alert-dialog-title">{"Add QR Code"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="idProduct"
            label="Id Product"
            type="text"
            name="idProduct"
            // value={product.productName}
            // onChange={handleChange}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleYesAddQR}>Yes</Button>
          <Button onClick={handleCloseAddQR}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

// QR Code
export function TableAddQrCodeButton({ data }) {
  // add QR Code
  const [openDialogAddQrCode, setOpenDialogAddQrCode] = React.useState(false);
  const [imgSrc, setImgSrc] = React.useState("");

  const handleClickOpenAddQrCode = async () => {
    const res = (await api.getQRCode(data.productId)).data;
    setImgSrc(`data:image/png;base64,${res}`);
    setOpenDialogAddQrCode(true);
  };

  const handleCloseAddQrCode = () => {
    setOpenDialogAddQrCode(false);
  };
  // const dispatch = useDispatch();

  return (
    <>
      <Tooltip title="Add QR Code" arrow>
        <Fab
          size="small"
          color="inherit"
          aria-label="addQR"
          onClick={handleClickOpenAddQrCode}
        >
          <QrCodeIcon />
        </Fab>
      </Tooltip>

      <Dialog
        open={openDialogAddQrCode}
        onClose={handleCloseAddQrCode}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">{"QR Code"}</DialogTitle>
        <DialogContent>
          <img src={imgSrc} style={{ width: "100%" }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddQrCode}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

// Bar Code
export function TableAddBarCodeButton({ data }) {
  // add Bar Code
  const [openDialogAddBarCode, setOpenDialogAddBarCode] = React.useState(false);
  const [imgSrc, setImgSrc] = React.useState("");

  const handleClickOpenAddBarCode = async () => {
    const res = (await api.getBarCode(data.productId)).data;
    setImgSrc(`data:image/png;base64,${res}`);
    setOpenDialogAddBarCode(true);
  };

  const handleCloseAddQrCode = () => {
    setOpenDialogAddBarCode(false);
  };

  // const dispatch = useDispatch();
  return (
    <>
      <Tooltip title="Add Bar Code" arrow>
        <Fab
          size="small"
          color="inherit"
          aria-label="addBarCode"
          onClick={handleClickOpenAddBarCode}
        >
          <CropFreeIcon />
        </Fab>
      </Tooltip>

      <Dialog
        open={openDialogAddBarCode}
        onClose={handleCloseAddQrCode}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">{"Bar Code"}</DialogTitle>
        <DialogContent>
          <img src={imgSrc} style={{ width: "100%" }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddQrCode}>No</Button>
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
TableAddQrCodeButton.propTypes = {
  data: PropTypes.object,
};
TableAddBarCodeButton.propTypes = {
  data: PropTypes.object,
};
