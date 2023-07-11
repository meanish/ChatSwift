import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import NotificationsIcon from "@mui/icons-material/Notifications";
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
    //setting activeChat to display chat
    GetActiveChat({ val: chat });

    //onChatlist select chat
    setclickUser(val.chat);

    //clear notification
    setNotification(
      notification.filter((n) => n.sender.email !== val.sender.email)
    );
  };

  return (
    <NotificationStyle>
      {notification.length > 0 && (
        <Button
          id="fade-button"
          aria-controls={open ? "fades-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className="notification-icon"
        >
          <span className="badge">
            {notification.length > 5 ? "5+" : notification.length}
          </span>
          <NotificationsIcon />
        </Button>
      )}
      <Menu
        id="fades-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <div className="Notifications-title">Notifications</div>
        {notification &&
          notification.slice(0, 3).map((val, index) => {
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
          })}
      </Menu>
    </NotificationStyle>
  );
};
export default InsideNotification;
