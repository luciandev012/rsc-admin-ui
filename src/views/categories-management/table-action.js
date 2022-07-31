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
import { deleteCategory } from "actions/category";
import { updateCategory } from "actions/category";

export function TableEditButton({ data }) {
  // validation
  const { handleSubmit } = useForm();
  // edit
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
  const [name, setName] = React.useState(data.categoryName);
  const dispatch = useDispatch();

  const handleClickOpenEdit = () => {
    setOpenDialogEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenDialogEdit(false);
  };

  const [subCateList, setSubCateList] = React.useState(data.subCategories);
  const handleAdd = () => {
    setSubCateList([...subCateList, { subCategoryName: "" }]);
  };
  const handleDelete = (index) => {
    const list = [...subCateList];
    list.splice(index, 1);
    setSubCateList(list);
  };
  const handleSubcateChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...subCateList];
    list[index][name] = value;
    setSubCateList(list);
  };
  const onSubmit = async () => {
    let putData = {
      categoryName: name,
      categoryId: data.categoryId,
      subCategories: subCateList,
    };
    dispatch(updateCategory(putData));
    handleCloseEdit();
    //dispatch(getAllBrand());
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
              id="cateName"
              label="Name"
              type="text"
              name="categoryName"
              onChange={(val) => setName(val.target.value)}
              value={name}
              variant="outlined"
              fullWidth
            />
            <Button onClick={handleAdd} type="button">
              Add sub category
            </Button>
            {subCateList.map((subc, index) => (
              <>
                <TextField
                  key={index}
                  margin="dense"
                  id="subCate"
                  label="Sub categories"
                  type="text"
                  fullWidth
                  name="subCategoryName"
                  // {...register("subCate", {
                  //   required: "SubCategory name is required.",
                  // })}
                  // error={Boolean(errors.subCate)}
                  // helperText={errors.subCate?.message}
                  value={subc.subCategoryName}
                  onChange={(e) => handleSubcateChange(e, index)}
                />
                <Button type="button" onClick={() => handleDelete(index)}>
                  Remove
                </Button>
              </>
            ))}
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
    dispatch(deleteCategory(data.categoryId));
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
        disableEscapeKeyDown={false}
        onBackdropClick="false"
      >
        <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete {data.categoryName}
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
