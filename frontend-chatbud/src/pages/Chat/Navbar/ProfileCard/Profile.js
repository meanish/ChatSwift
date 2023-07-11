import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";
import { GlobalMessage } from "../../../../context/MessengerContext";
import ProfileCard from "./Card";
import { GlobalChat } from "../../../../context/ChatContext";

export default function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [opendialog, setOpenDialog] = React.useState(false);
  const { LogOut } = GlobalMessage();
  const { setchatList } = GlobalChat();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  //Logout and removeItems
  const LogoutHandler = () => {
    setchatList([]);
    localStorage.removeItem("userData");
    localStorage.removeItem("UserChatList");
    localStorage.removeItem("SelectedChat");
    localStorage.removeItem("clickedUser");
    localStorage.removeItem("usertoken");
    // Calling "LOGOUT" action to reset the state
    LogOut();
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              <img
                src="https://fastly.picsum.photos/id/868/200/300.webp?hmac=vkPge3pIJHMPoX_aCTEPEeElucqrAYtZuDkvnZdKwKQ"
                alt="Random"
              />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleDialogOpen}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <NavLink onClick={LogoutHandler} to="/">
            Log Out
          </NavLink>
        </MenuItem>
      </Menu>

      {/* //My account details */}

      <ProfileCard
        handleDialogClose={handleDialogClose}
        opendialog={opendialog}
      />
    </React.Fragment>
  );
}
