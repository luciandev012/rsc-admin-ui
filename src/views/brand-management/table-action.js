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
import { updateBrand } from "actions/brand";
import { deleteBrand } from "actions/brand";

import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { getAllCategories } from "actions/category";
import { getAllProducts } from "actions/product";
import * as api from "../../apis/product";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export function TableEditButton({ data }) {
  // validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // edit
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
  const categories = useSelector((state) => state.category);
  const products = useSelector((state) => state.product);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllProducts());
  }, []);
  // const findProd = (id) => {
  //   let prod = products.find((p) => p.productId == id);
  //   //console.log(prod);
  //   if (prod) {
  //     return prod.productName;
  //   }
  // };
  const listData = data.getAllDishDetails;
  const [dishDetails, setDishDetails] = React.useState(
    listData.map((ld) => {
      // let prods = ld.productIdList.map((pld) => {
      //   return { id: pld, name: findProd(pld) };
      // });
      // console.log(prods);
      return {
        category: 0,
        productsToSelect: [],
        products: ld.productIdList.map((pid) => {
          const pName = products.find((p) => p.productId == pid);
          const name = pName ? pName.productName : "";
          return { id: ld, name: name };
        }),
        quantity: ld.quantity,
        unitName: ld.unitName,
        productName: ld.productName,
      };
    })
  );
  const handleClickOpenEdit = () => {
    categories.push({ categoryId: 0, categoryName: "Chọn nguyên liệu" });
    setOpenDialogEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenDialogEdit(false);
  };

  const onSubmit = async () => {
    let putData = {
      brandId: data.brandId,
      brandname: name,
    };
    console.log("putDATA", putData);
    dispatch(updateBrand(putData));
    handleCloseEdit();
    //dispatch(getAllBrand());
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
  const handleClick = () => {
    console.info("You clicked the Chip.");
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
                  value={data.dishName}
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
                  value={data.dishDescription}
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
                  value={data.dishCooking}
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
                                  // onDelete={
                                  //   data.name === "React"
                                  //     ? undefined
                                  //     : handleDelete(data, index)
                                  // }
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
                  <Button
                    startIcon={<AddCircleIcon />}
                    //onClick={() => handleRemove(index)}
                  >
                    Xóa nguyên liệu
                  </Button>
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
                      //onChange={(e) => handleProductChange(e, index)}
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
                      //onChange={(e) => handleProductChange(e, index)}
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
                      //onChange={(e) => handleProductChange(e, index)}
                    />
                  </div>
                </Box>
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
    //let path = `https://localhost:5001/api/v1/Product/DeleteBrand?id=${data.brandId}`;
    //await axios.delete(path);
    dispatch(deleteBrand(data.brandId));
    setOpenDialogDelete(false);
    //window.location.reload();
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
            Bạn có muốn xóa món ăn không?
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
