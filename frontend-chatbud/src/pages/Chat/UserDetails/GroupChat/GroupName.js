import React, { useState, useEffect } from "react";
import { GlobalMessage } from "../../../../context/MessengerContext";
import { GroupStyle } from "../../../../components/ChatStyle/UserDetails/GroupChat/GroupNameStyle.styled";

const GroupName = () => {
  const { selectedChat, RenameGroup } = GlobalMessage();
  const [isEditable, setIsEditable] = useState(false);

  const [editedText, setEditedText] = useState();

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
      <div className="groupname">
        <h4>
          GroupName:
          {isEditable ? (
            <input type="text" value={editedText} onChange={handleChange} />
          ) : (
            <span>{editedText}</span>
          )}
        </h4>
        {isEditable ? (
          <div className="edit-actions">
            <button
              className="bubble-btn bubble-btn-small"
              onClick={() =>
                RenameGroup({ editedText, selectedChat, setIsEditable })
              }
            >
              Save
            </button>
            <button
              className="bubble-btn bubble-btn-small"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="editname">
            <button
              onClick={enableEdit}
              className="bubble-btn bubble-btn-small"
            >
              Rename
            </button>
          </div>
        )}
      </div>
    </GroupStyle>
  );
};

export default GroupName;
