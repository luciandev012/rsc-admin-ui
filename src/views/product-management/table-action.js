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
// validation
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux/es/exports";
import { deleteProduct, updateProduct } from "actions/product";
import AddIcon from "@material-ui/icons/Add";
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
    setValue("unitId", data.unitId);
    setValue("subCategoryId", data.subCategoryId);
    setValue("brandId", data.brandId);
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
    fd.append("unitId", pData.unitId);
    fd.append("subCategoryId", pData.subCategoryId);
    fd.append("productId", data.productId);
    fd.append("brandId", pData.brandId);
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
            <TextField
              autoFocus
              margin="dense"
              id="unitId"
              label="Unit Id"
              type="text"
              name="unitId"
              {...register("unitId", {
                required: "Unit id is required.",
              })}
              error={!!errors.unitId}
              helperText={errors.unitId?.message}
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="dense"
              id="subCategoryId"
              label="Sub Category Id"
              type="text"
              name="subCategoryId"
              {...register("subCategoryId", {
                required: "Sub category is required.",
              })}
              error={!!errors.subCategoryId}
              helperText={errors.subCategoryId?.message}
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="dense"
              id="brandId"
              label="Brand Id"
              type="text"
              name="brandId"
              {...register("brandId", {
                required: "Brand Id is required.",
              })}
              error={!!errors.brandId}
              helperText={errors.brandId?.message}
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
