import React, { useEffect } from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
// @material-ui/icons
import Notifications from "@material-ui/icons/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import Divider from "@material-ui/core/Divider";

// core components
import Button from "components/CustomButtons/Button.js";
// Dialog
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import { useDispatch, useSelector } from "react-redux";
import { getWarning } from "actions/warning";

const useStyles = makeStyles(styles);

export default function ManagerNavbarLinks() {
  // validation
  const {
    handleSubmit,
    register,
    formState: { errors },
    resetField,
  } = useForm();
  const onSubmit = async (pData) => {
    // if (pData.newPassword === pData.cfPassword) {
    //   const changeModel = {
    //     phonenumber: user.phonenumber,
    //     oldPassword: pData.oldPassword,
    //     newPassword: pData.newPassword,
    //   };
    //   const { data } = await api.changePassword(changeModel);
    //   //console.log(data);
    //   if (data != true) {
    //     alert(data);
    //   } else {
    //     alert("Change password successfully!");
    //   }
    //   handleClose();
    // } else {
    //   alert("Confirm password not match new password!");
    // }
    console.log(pData);
  };
  const classes = useStyles();
  const [openProfile, setOpenProfile] = React.useState(null);
  const [openNotification, setOpenNotification] = React.useState(null);
  const handleClickNotification = (event) => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const dispatch = useDispatch();
  const warnings = useSelector((state) => state.warning);
  useEffect(() => {
    dispatch(getWarning());
  }, []);

  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };

  const [open, setOpen] = React.useState(false);

  // open dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // close dialog
  const handleClose = () => {
    resetField("oldPassword");
    resetField("newPassword");
    resetField("cfPassword");
    setOpen(false);
  };

  return (
    <div>
      <Button
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-label="Dashboard"
        className={classes.buttonLink}
      >
        <Hidden mdUp implementation="css">
          <p className={classes.linkText}>Dashboard</p>
        </Hidden>
      </Button>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openNotification ? "notification-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickNotification}
          className={classes.buttonLink}
        >
          <Notifications className={classes.icons} />
          <span className={classes.notifications}>
            {warnings ? warnings.length : 0}
          </span>
          <Hidden mdUp implementation="css">
            <p onClick={handleCloseNotification} className={classes.linkText}>
              Notification
            </p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openNotification }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    {warnings
                      ? warnings.map((warn, index) => (
                          <MenuItem
                            onClick={handleCloseNotification}
                            className={classes.dropdownItem}
                            key={index}
                          >
                            {warn.productName}
                          </MenuItem>
                        ))
                      : null}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <SettingsIcon className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={(handleCloseProfile, handleClickOpen)}
                      className={classes.dropdownItem}
                    >
                      Change Password
                    </MenuItem>

                    <Dialog
                      open={open}
                      onClose={handleClose}
                      onSubmit={handleSubmit(onSubmit)}
                      disableEscapeKeyDown={false}
                      onBackdropClick="false"
                    >
                      <form>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogContent>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="oldPassword"
                            label="Old Password"
                            type="password"
                            fullWidth
                            {...register("oldPassword", {
                              required: "Password is required.",
                            })}
                            error={!!errors.oldPassword}
                            helperText={errors.oldPassword?.message}
                            name="oldPassword"
                            // value={model.oldPassword}
                            // onChange={handleChange}
                          />

                          <TextField
                            margin="dense"
                            id="newPassword"
                            label="New Password"
                            type="password"
                            fullWidth
                            name="newPassword"
                            {...register("newPassword", {
                              required: "New password is required.",
                              pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/i,
                                message:
                                  "Password must have Uppercase, Lowercase, Special Char, Number and minLength: 6",
                              },
                            })}
                            error={!!errors.newPassword}
                            helperText={errors.newPassword?.message}
                            // value={model.newPassword}
                            // onChange={handleChange}
                          />

                          <TextField
                            margin="dense"
                            id="cfPassword"
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            name="cfPassword"
                            {...register("cfPassword", {
                              required: "Confirm password is required.",
                              pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/i,
                                message:
                                  "Password must have Uppercase, Lowercase, Special Char, Number and minLength: 6",
                              },
                            })}
                            error={!!errors.cfPassword}
                            helperText={errors.cfPassword?.message}
                            // value={model.cfPassword}
                            // onChange={handleChange}
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button color="warning" type="submit">
                            Save
                          </Button>
                          <Button onClick={handleClose}>Cancel</Button>
                        </DialogActions>
                      </form>
                    </Dialog>

                    <Divider light />
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}
