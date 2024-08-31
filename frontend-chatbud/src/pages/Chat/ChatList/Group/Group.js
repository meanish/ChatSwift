import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Recommend from "../../../../config/Recommend";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import { GlobalChat } from "../../../../context/ChatContext";
import Loader from "../../../../config/oldMessageLoader";
import { GroupStyle } from "../../../../components/ChatStyle/UserDetails/GroupChat/GroupNameStyle.styled";

const BasicModal = () => {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    searchResults,
    setSearchResults,
    createGroup,
    openSnack,
    setOpenSnack,
  } = GlobalChat();

  const [selectedUser, setselectedUser] = useState([]);
  const [chatName, setchatName] = useState("");

  const selectUser = (newuser) => {
    if (selectedUser.includes(newuser)) {
      return;
    }
    return setselectedUser([...selectedUser, newuser]);
  };

  const removeUser = (user) => {
    const result = selectedUser.filter((val) => {
      return user !== val;
    });
    setselectedUser(result);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <GroupStyle>
      <button className="right-container-button" onClick={handleOpenModal}>
        <span className="long-text bubble-btn">
          Add Group <AddIcon />
        </span>
      </button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>

            <div className="group_box">
              <div className="group_title">
                <h1>Create Group</h1>
                <CloseIcon onClick={handleCloseModal} className="close-icon" />
              </div>
              <div className="group_body" style={{ display: "block" }}>
                <div
                  className="group_name"
                  style={{
                    display: "flex",
                    justifyItems: " center",
                    alignItems: "center",
                    gap: "2rem",
                    flexDirection: "column",
                  }}
                >
                  <div className="group-members">
                    <label>Add members:</label>
                    <Recommend
                      props={{
                        setKeyword,
                        keyword,
                        setSearchResults,
                        label: "Search Friends",
                        setisLoading,
                      }}
                    />
                  </div>

                  <form className="search-box" action="" method="post">
                    <label>Group Name:</label>

                    <TextField
                      id="outlined-basic"
                      label="ChatName"
                      variant="outlined"
                      value={chatName}
                      onChange={(e) => setchatName(e.target.value)}
                    />
                  </form>
                  <div className="create"> <button
                    className="bubble-btn"
                    onClick={() =>
                      createGroup({ selectedUser, setselectedUser, chatName })
                    }
                  >
                    Group
                  </button>
                  </div>
                </div>

                <div className="selected_user">
                  {selectedUser.length > 0 &&
                    selectedUser.map((val, index) => (
                      <p key={index}>
                        {val.firstname}
                        <CloseIcon onClick={() => removeUser(val)} />
                      </p>
                    ))}
                </div>
                {isLoading ? (
                  <div className="loader_container">
                    <Loader />
                  </div>
                ) : (
                  <div className="user_list scrollbar" id="scroll_style">
                    {searchResults.length === 0 ? (
                      <p></p>
                    ) : (
                      <List>
                        {searchResults.map((user, index) => (
                          <ListItem
                            className="force-overflow"
                            key={index}
                            onClick={() => selectUser(user)}
                          >
                            <ListItemText
                              primary={`${user.firstname} ${user.lastname}`}
                            />
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        message="Either group name or users are missing or maybe you didn't select enough users..."
        onClick={() => setOpenSnack(false)}
      />
    </GroupStyle>
  );
};

export default BasicModal;
