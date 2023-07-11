import React from "react";
import { UserDetailStyle } from "../../../components/ChatStyle/UserDetails/Userdetail.styled";
import { GlobalMessage } from "../../../context/MessengerContext";
import GroupUserDetails from "./GroupChat/GroupUserDetails";
import SingleUserDetail from "./SingleChat/SingleUserDetail";

const UserDetails = () => {
  const { selectedChat } = GlobalMessage();

  return (
    <UserDetailStyle>
      {selectedChat ? (
        <>
          {selectedChat.isGroupChat ? (
            <GroupUserDetails />
          ) : (
            <SingleUserDetail />
          )}
        </>
      ) : (
        <p>Select a User</p>
      )}
    </UserDetailStyle>
  );
};

export default UserDetails;
