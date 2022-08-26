import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { PropTypes } from "prop-types";
// validation
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux/es/exports";

import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { getAllCategories } from "actions/category";
//import { getAllProducts } from "actions/product";
import * as api from "../../apis/product";
import { updateDish } from "actions/dish";
import { deleteDish } from "actions/dish";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export function TableEditButton({ data }) {
  // validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // edit
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
  const categories = useSelector((state) => state.category);
  //const products = useSelector((state) => state.product);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllCategories());
    //dispatch(getAllProducts());
  }, []);
  const listData = data.getAllDishDetails;
  const [dishDetails, setDishDetails] = React.useState(
    listData.map((ld) => {
      const lp = ld.productIdList
        ? ld.productIdList.map((pid, index) => {
            return { id: pid, name: ld.productName[index] };
          })
        : null;
      return {
        category: 0,
        productsToSelect: [],
        products: lp,
        quantity: ld.quantity,
        unitName: ld.unitName,
        productName: ld.ingredient,
      };
    })
  );
  const handleClickOpenEdit = () => {
    categories.push({ categoryId: 0, categoryName: "Chọn nguyên liệu" });
    setValue("dishName", data.dishName);
    setValue("description", data.dishDescription);
    setValue("dishCooking", data.dishCooking);
    setOpenDialogEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenDialogEdit(false);
  };

  const onSubmit = async (inData) => {
    const inputData = {
      dishId: data.dishId,
      dishName: inData.dishName,
      dishDescription: inData.description,
      dishCooking: inData.dishCooking,
      dishDetails: dishDetails.map((dish) => {
        return {
          productIdList: dish.products.map((pro) => pro.id),
          quantity: dish.quantity,
          ingredient: dish.productName,
          unitName: dish.unitName,
        };
      }),
    };
    dispatch(updateDish(inputData));
    handleCloseEdit();
  };
  const handleChangeCate = async (e, index) => {
    const res = await api.getAllProductByCategory(e.target.value);
    const list = [...dishDetails];
    list[index].category = e.target.value;
    list[index].productsToSelect = res.data.map((p) => {
      return { id: p.productId, name: p.productName };
    });
    setDishDetails(list);
  };
  const handleDelete = (data, index) => () => {
    const list = [...dishDetails];
    list[index].products = list[index].products.filter(
      (pro) => pro.id !== data.id
    );
    setDishDetails(list);
  };
  const handleRemove = (index) => {
    const list = [...dishDetails];
    list.splice(index, 1);
    setDishDetails(list);
  };
  const handleClick = (data, index) => {
    const list = [...dishDetails];
    !list[index].products.some((pro) => pro.id === data.id) &&
      list[index].products.push(data);
    setDishDetails(list);
  };
  const handleProductChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...dishDetails];
    list[index][name] = value;
    setDishDetails(list);
  };
  const handleAdd = () => {
    setDishDetails([
      ...dishDetails,
      {
        category: 0,
        productsToSelect: [],
        products: [],
        productName: "",
        unitName: "",
        quantity: "",
      },
    ]);
  };
  return (
    <>
      <Button
        color="warning"
        variant="contained"
        startIcon={<EditIcon />}
        onClick={handleClickOpenEdit}
      >
        Sửa
      </Button>

      <Dialog
        open={openDialogEdit}
        onClose={handleCloseEdit}
        onSubmit={handleSubmit(onSubmit)}
        disableEscapeKeyDown={false}
        onBackdropClick="false"
      >
        <form>
          <DialogTitle>Sửa</DialogTitle>
          <DialogContent>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1 },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  fullWidth
                  margin="dense"
                  id="dishName"
                  label="Tên món ăn"
                  type="text"
                  name="dishName"
                  variant="outlined"
                  {...register("dishName", {
                    required: "Dish name is required.",
                  })}
                  error={!!errors.dishName}
                  helperText={errors.dishName?.message}
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  margin="dense"
                  id="description"
                  label="Mô tả"
                  type="text"
                  name="description"
                  variant="outlined"
                  {...register("description", {
                    required: "Description is required.",
                  })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  margin="dense"
                  id="cook"
                  label="Cách nấu ăn"
                  type="text"
                  name="dishCooking"
                  variant="outlined"
                  {...register("dishCooking", {
                    required: "Dish cooking is required.",
                  })}
                  error={!!errors.dishCooking}
                  helperText={errors.dishCooking?.message}
                />
              </div>
            </Box>

            {dishDetails.map((dish, index) => (
              <div key={index}>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1 },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <h4>
                    <b>Nguyên liệu nấu ăn</b>
                  </h4>
                  <div>
                    {/* chon category */}
                    <TextField
                      fullWidth
                      id="outlined-select-currency"
                      select
                      label="Nguyên liệu"
                      onChange={(e) => handleChangeCate(e, index)}
                      value={dish.category}
                    >
                      {categories.map((option) => (
                        <MenuItem
                          key={option.categoryId}
                          value={option.categoryId}
                        >
                          {option.categoryName}
                        </MenuItem>
                      ))}
                    </TextField>

                    <Box sx={{ m: 2 }}>
                      <div>
                        <Paper
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            listStyle: "none",
                            p: 0.5,
                            m: 1,
                          }}
                          component="ul"
                          elevation={0}
                        >
                          {dish.productsToSelect.map((data) => {
                            return (
                              <ListItem key={data.id}>
                                <Chip
                                  label={data.name}
                                  onClick={() => handleClick(data, index)}
                                />
                              </ListItem>
                            );
                          })}
                        </Paper>
                      </div>
                      <div>
                        <Paper
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            listStyle: "none",
                            p: 0.5,
                            m: 1,
                          }}
                          component="ul"
                          variant="outlined"
                        >
                          {dish.products.map((data) => {
                            let icon;
                            return (
                              <ListItem key={data.id}>
                                <Chip
                                  icon={icon}
                                  label={data.name}
                                  onDelete={
                                    data.name === "React"
                                      ? undefined
                                      : handleDelete(data, index)
                                  }
                                />
                              </ListItem>
                            );
                          })}
                        </Paper>
                      </div>
                    </Box>
                  </div>
                </Box>

                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1 },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      fullWidth
                      margin="dense"
                      id="productName"
                      label="Tên sản phẩm"
                      type="text"
                      name="productName"
                      variant="outlined"
                      value={dish.productName}
                      onChange={(e) => handleProductChange(e, index)}
                    />
                  </div>
                  <div>
                    <TextField
                      fullWidth
                      margin="dense"
                      id="quantity"
                      label="Số lượng"
                      type="text"
                      name="quantity"
                      variant="outlined"
                      value={dish.quantity}
                      onChange={(e) => handleProductChange(e, index)}
                    />
                  </div>
                  <div>
                    <TextField
                      fullWidth
                      margin="dense"
                      id="unitName"
                      label="Tên đơn vị"
                      type="text"
                      name="unitName"
                      variant="outlined"
                      value={dish.unitName}
                      onChange={(e) => handleProductChange(e, index)}
                    />
                  </div>
                </Box>
                <Button
                  startIcon={<AddCircleIcon />}
                  onClick={() => handleRemove(index)}
                >
                  Xóa nguyên liệu
                </Button>
              </div>
            ))}
            <div>
              <Button startIcon={<AddCircleIcon />} onClick={handleAdd}>
                Thêm nguyên liệu
              </Button>
            </div>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleCloseEdit}>Hủy</Button>
            <Button type="submit">Lưu</Button>
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
    dispatch(deleteDish(data.dishId));
    setOpenDialogDelete(false);
  };
  const dispatch = useDispatch();
  return (
    <>
      <Button
        color="error"
        variant="contained"
        startIcon={<DeleteIcon />}
        onClick={handleClickOpenDelete}
      >
        Xóa
      </Button>

      <Dialog
        open={openDialogDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableEscapeKeyDown={false}
        onBackdropClick="false"
      >
        <DialogTitle id="alert-dialog-title">{"Xóa"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có muốn xóa món không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Hủy</Button>
          <Button onClick={handleYesDelete}>Xóa</Button>
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
