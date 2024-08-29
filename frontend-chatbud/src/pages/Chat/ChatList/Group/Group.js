import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 1,
};

export default function BasicModal() {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const {
    searchResults,
    setSearchResults,
    createGroup,
    openSnack,
    setOpenSnack,
    handleClose,
    handleOpen,
    open,
  } = GlobalChat();

  const [selectedUser, setselectedUser] = useState([]);
  const [chatName, setchatName] = useState("");

  //selected user to make a group
  const selectUser = (newuser) => {
    if (selectedUser.includes(newuser)) {
      return; //if same user is clicked more than 1
    }
    return setselectedUser([...selectedUser, newuser]);
  };

  //remove specific user before grouping
  const removeUser = (user) => {
    const result = selectedUser.filter((val) => {
      return user !== val;
    });
    setselectedUser(result);
  };

  return (
    <>
      <button className="right-container-button" onClick={handleOpen}>
        <span className="long-text bubble-btn">
          Add Group <AddIcon />
        </span>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <GroupStyle>
            <div className="group_box">
              <div className="group_title">
                <h1>Create Group</h1>
              </div>
              <div className="group_body">
                <div
                  className="group_name"
                  style={{
                    margin: "20px",
                    display: "flex",
                    justifyItems: "center",
                    alignItems: "center",
                  }}
                >
                  <Recommend
                    props={{
                      setKeyword,
                      keyword,
                      setSearchResults,
                      label: "Search Friends",
                      setisLoading,
                    }}
                  />
                  <form className="search-box" action="" method="post">
                    <TextField
                      id="outlined-basic"
                      label="ChatName"
                      variant="outlined"
                      value={chatName}
                      onChange={(e) => setchatName(e.target.value)}
                    />
                  </form>
                  <button
                    className="bubble-btn  bubble-btn-small"
                    onClick={() =>
                      createGroup({ selectedUser, setselectedUser, chatName })
                    }
                  >
                    Group
                  </button>
                </div>

                {/* //selected users */}
                <div className="selected_user ">
                  {selectedUser.length > 0
                    ? selectedUser.map((val, index) => {
                        return (
                          <p key={index}>
                            {val.firstname}

                            <CloseIcon onClick={() => removeUser(val)} />
                          </p>
                        );
                      })
                    : null}
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
          </GroupStyle>
        </Box>
      </Modal>
      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        message="Either group name or users are missing or may be you didnt select enough users......"
        onClick={() => setOpenSnack(false)}
      />
    </>
  );
}
