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
import { useDispatch } from "react-redux/es/exports";
import { updateBrand } from "actions/brand";
import { deleteBrand } from "actions/brand";

import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const currencies = [
  {
    value: "Thịt heo",
    label: "Thịt heo",
  },
  {
    value: "Thịt bò",
    label: "Thịt bò",
  },
  {
    value: "Thịt gà",
    label: "Thịt gà",
  },
];

export function TableEditButton({ data }) {
  // validation
  const {
    // register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  //console.log(data);

  //console.log(errors);

  // edit
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
  // const [name, setName] = React.useState(data.brandname);
  const dispatch = useDispatch();

  const handleClickOpenEdit = () => {
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

  const handleDelete = (chipToDelete) => () => {
    setChipDataSelect((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const [chipData] = React.useState([
    { key: 0, label: "Thịt Thăn Bò Hàn Quốc" },
    { key: 1, label: "Thịt Thăn Bò Mỹ" },
    { key: 2, label: "Thịt Thăn Bò Úc" },
    { key: 3, label: "Thịt Thăn Thái Lan" },
  ]);

  const [chipDataSelect, setChipDataSelect] = React.useState([
    { key: 0, label: "Thịt Thăn Bò Úc" },
    { key: 1, label: "Thịt Thăn Thái Lan" },
  ]);

  const handleClick = () => {
    console.info("You clicked the Chip.");
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
                  name="description"
                  variant="outlined"
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
                  name="description"
                  variant="outlined"
                />
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
                  // onChange={handleChange}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
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
                      {chipData.map((data) => {
                        return (
                          <ListItem key={data.key}>
                            <Chip label={data.label} onClick={handleClick} />
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
                      {chipDataSelect.map((data) => {
                        let icon;

                        return (
                          <ListItem key={data.key}>
                            <Chip
                              icon={icon}
                              label={data.label}
                              onDelete={
                                data.label === "React"
                                  ? undefined
                                  : handleDelete(data)
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

            {/* co the add nhiều */}
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
                  name="description"
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  margin="dense"
                  id="quantity"
                  label="Số lượng"
                  type="text"
                  name="description"
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  margin="dense"
                  id="unitName"
                  label="Tên đơn vị"
                  type="text"
                  name="description"
                  variant="outlined"
                />
              </div>
              <div>
                <Button startIcon={<AddCircleIcon />}>Thêm nguyên liệu</Button>
              </div>
            </Box>
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
