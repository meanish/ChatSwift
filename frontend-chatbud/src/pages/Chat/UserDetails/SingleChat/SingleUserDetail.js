import React from "react";
import { SingleUserStyle } from "../../../../components/ChatStyle/UserDetails/SingleChat/SingleUser.styled";
import { GlobalMessage } from "../../../../context/MessengerContext";
import { GlobalChat } from "../../../../context/ChatContext";

const SingleUserDetail = () => {
  const { selectedChat } = GlobalMessage();
  const { user } = GlobalChat();

  return (
    <SingleUserStyle>
      {selectedChat.users.map((val) => {
        if (user._id !== val._id) {
          return (
            <div className="user_detailing" key={val._id}>
              <h1 className="head">User Details</h1>
              <div className="user_name">
                Full Name:
                <span className="detail name-highlight">
                  {val.firstname} {val.lastname}
                </span>
              </div>
              <div className="user_name">
                Email: <span className="detail">{val.email}</span>
              </div>
              <div className="user_name">
                Address: <span className="detail">{val.address}</span>
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}
    </SingleUserStyle>
  );
};

export default SingleUserDetail;
