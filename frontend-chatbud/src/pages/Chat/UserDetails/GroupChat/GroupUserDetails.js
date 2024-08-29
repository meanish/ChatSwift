import React, { useState } from "react";
import { GlobalMessage } from "../../../../context/MessengerContext";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { GlobalChat } from "../../../../context/ChatContext";
import Recommend from "../../../../config/Recommend";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import CloseIcon from "@mui/icons-material/Close";
import GroupName from "./GroupName";
import { GroupUserStyle } from "../../../../components/ChatStyle/UserDetails/GroupChat/GroupUserDetailsStyle.syled";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../config/oldMessageLoader.js";

const GroupUserDetails = () => {
  const { selectedChat, DeleteChatMember, AddChatMember } = GlobalMessage();
  const [isLoading, setisLoading] = useState(false);
  const { user, selectedUser, setselectedUser } = GlobalChat();
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");


  const removeUser = (user) => {
    const result = selectedUser.filter((val) => {
      return user !== val;
    });
    setselectedUser(result);
  };

  //selected user to make a group
  const selectUser = (newuser) => {
    if (selectedUser.includes(newuser)) {
      return; //if same user is clicked more than 1
    }
    return setselectedUser([...selectedUser, newuser]);
  };

  return (
    <GroupUserStyle>
      <GroupName />
      <div className="group_members">
        <div
          className="add_member"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Recommend
            props={{
              setKeyword,
              keyword,
              setSearchResults,
              label: "Add New Friends",
              setisLoading,
            }}
          />
          {/* aDD mEMBER */}
          {selectedUser.length > 0 ? (
            <div className="add_member ">
              <button
                className="bubble-btn  bubble-btn-small"
                onClick={() =>
                  AddChatMember({
                    selectedUser,
                    selectedChat,
                    setKeyword,
                    setSearchResults,
                  })
                }
              >
                Add
              </button>
            </div>
          ) : null}

          {/* //selected users */}
          <div className="selected_user">
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
            <>
              {searchResults.length === 0 && keyword ? (
                <p>No result found</p>
              ) : (
                <List className="scrollbar" id="scroll_style">
                  {searchResults.map((user) => (
                    <ListItem
                      key={user._id}
                      onClick={() => selectUser(user)}
                      className="force-overflow"
                    >
                      <ListItemText
                        primary={`${user.firstname} ${user.lastname}`}
                        secondary={user.email}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </>
          )}
        </div>
        <div className="group_members">
          <h5>Group Members:</h5>
          <div className="member_name ">
            {selectedChat.users.map((val, index) => {

              if (user && user._id === val._id) {
                return null; // Skip rendering the current user
              }
              return (
                <div className="member_identity" key={index}>
                  <div className="name">{val.firstname}</div>
                  <div className="remove">
                    <PersonRemoveIcon
                      className="icon-delete"
                      onClick={() => DeleteChatMember({ val })}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="exit_group"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <button
            onClick={() => {
              const confirmExit = window.confirm("Are you sure you want to exit the group?");
              if (confirmExit) {
                navigate("/chat");
                DeleteChatMember({ val: user });
              }
            }}
          >
            <span className="long-text bubble-btn">Exit the Group</span>
          </button>
        </div>
      </div>
    </GroupUserStyle>
  );
};

export default GroupUserDetails;
