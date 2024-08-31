import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge } from "@mui/material";
import { GlobalChat } from "../../../../context/ChatContext";
import { GlobalMessage } from "../../../../context/MessengerContext";
import { NotificationStyle } from "../../../../components/ChatStyle/Messenger/InsideNotification/Notification.styled";

const InsideNotification = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { notification, setNotification, setclickUser } = GlobalChat();
  const { GetActiveChat } = GlobalMessage();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getChat = ({ val }) => {
    const chat = val.chat;
    handleClose();
    GetActiveChat({ val: chat });
    setclickUser(val.chat);
    setNotification(
      notification.filter((n) => n.sender.email !== val.sender.email)
    );
  };

  return (
    <NotificationStyle>
      <>
        <Button
          id="fade-button"
          aria-controls={open ? "fades-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className="notification-icon"
        >
          <Badge
            badgeContent={notification.length > 5 ? "5+" : notification.length}
            color="error"
          >
            <NotificationsIcon />
          </Badge>
        </Button>
        <Menu
          id="fades-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
          title="Notification"
        >
          {notification.length > 0 ? notification.slice(0, 3).map((val, index) => {
            const isFirstInstance =
              index === 0 ||
              val.sender.email !== notification[index - 1].sender.email;
            return (
              <MenuItem
                onClick={() => getChat({ val })}
                key={index}
                className="notification-box"
              >
                {isFirstInstance && <span>{val.sender.firstname}: </span>}
                <span className="menu-item">{val.content}</span>
              </MenuItem>
            );
          }) : <>No Notifications</>}
        </Menu>
      </>
    </NotificationStyle>
  );
};

export default InsideNotification;
