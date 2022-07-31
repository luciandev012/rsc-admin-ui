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
import { getAllCategories } from "actions/category";
import { addCategory } from "actions/category";

export default function CategoriesManagementPage() {
  // validation
  const {
    handleSubmit,
    register,
    formState: { errors },
    resetField,
  } = useForm();
  const onSubmit = (data) => {
    const category = {
      categoryName: data.categoryName,
      subCategories: subCateList,
    };
    dispatch(addCategory(category));
    handleClose();
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
    resetField("categoryName");
    resetField("subCategoryName");
    setOpen(false);
  };
  const dispatch = useDispatch();
  const cates = useSelector((state) => state.category);
  // const [cate, setCate] = useState({
  //   categoryName: "",
  // });
  const [subCateList, setSubCateList] = useState([{ subCategoryName: "" }]);
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
  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setCate((prevValue) => {
  //     return {
  //       ...prevValue,
  //       [name]: value,
  //     };
  //   });
  // };
  useEffect(() => {
    dispatch(getAllCategories());
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
            <DialogTitle>Add new category</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="categoryName"
                label="Category name"
                type="text"
                fullWidth
                name="categoryName"
                {...register("categoryName", {
                  required: "Category name is required.",
                })}
                error={Boolean(errors.categoryName)}
                helperText={errors.categoryName?.message}
                // value={cate.categoryName}
                // onChange={handleChange}
                variant="outlined"
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
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </form>
        </Dialog>

        <Card>
          <CardHeader color="primary"></CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Category Name", "Actions"]}
              tableData={cates.map((cate) => {
                return [cate.categoryId, cate.categoryName];
              })}
              editData={cates}
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
