import React, { useState, useEffect } from "react";
import { GlobalMessage } from "../../../../context/MessengerContext";
import { GroupStyle } from "../../../../components/ChatStyle/UserDetails/GroupChat/GroupNameStyle.styled";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import { green } from "@mui/material/colors";

const GroupName = () => {
  const { selectedChat, RenameGroup } = GlobalMessage();
  const [isEditable, setIsEditable] = useState(false);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    setEditedText(selectedChat.chatName);
  }, [selectedChat.chatName]);

  const enableEdit = () => {
    setIsEditable(true);
  };

  const handleCancel = () => {
    setIsEditable(false);
    setEditedText(selectedChat.chatName);
  };

  const handleChange = (event) => {
    setEditedText(event.target.value);
  };

  return (
    <GroupStyle>
      <div className="groupname-container">
        <h4>GroupName:</h4>
        {isEditable ? (
          <div className="edit-mode ">
            <Input
              value={editedText}
              onChange={handleChange}
              disableUnderline
              fullWidth
              inputProps={{
                style: {
                  fontSize: "1.2rem",
                  border: "1px solid green",
                  padding: "3px",
                },
              }}
            />
            <IconButton
              onClick={() =>
                RenameGroup({ editedText, selectedChat, setIsEditable })
              }
              color="primary"
              size="large"
            >
              <SaveIcon />
            </IconButton>
            <IconButton onClick={handleCancel} color="secondary" size="large">
              <CancelIcon />
            </IconButton>
          </div>
        ) : (
          <div className="display-mode">
            <span>{editedText}</span>
            <IconButton onClick={enableEdit} color="primary" size="large">
              <EditIcon />
            </IconButton>
          </div>
        )}
      </div>
    </GroupStyle>
  );
};

export default GroupName;
