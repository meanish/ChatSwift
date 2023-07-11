import React, { useState } from "react";
import Recommend from "../../config/Recommend";
import { GetStartedStyle } from "../../components/Home/GetStarted.styled";
import { GlobalChat } from "../../context/ChatContext";
import { GetChat } from "../../config/ChatLogic";
import { GlobalMessage } from "../../context/MessengerContext";
import Loader from "../../config/oldMessageLoader";

const GetStarted = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { user, setclickUser, setchatList } = GlobalChat();
  const { RestoreselectedChat } = GlobalMessage();
  const [keyword, setKeyword] = useState("");
  const [isLoading, setisLoading] = useState(false);

  return (
    <GetStartedStyle>
      <div className="get-started">
        <div className="title">
          <h1>New In</h1>
          <span>
            <div className="logo_section">
              <img
                src={require("../../images/logobird.png")}
                alt="logo.png"
                className="small-logo"
              />
            </div>
          </span>
        </div>

        <div className="search_user">
          <Recommend
            props={{
              setKeyword,
              keyword,
              setSearchResults,
              label: "Search Someone to Chat with",
              setisLoading,
            }}
          />
        </div>
        {isLoading ? (
          <div className="loader_container">
            <Loader />
          </div>
        ) : (
          <div className="user_result">
            {keyword && searchResults.length === 0 ? (
              <p className="nouser">No users found</p>
            ) : (
              <div id="wrapper">
                <div className="scrollbar" id="scroll_style">
                  {searchResults.map((seluser) => (
                    <div
                      className="force-overflow"
                      key={seluser._id}
                      onClick={() =>
                        GetChat(
                          user,
                          seluser._id,
                          setchatList,
                          RestoreselectedChat,
                          setclickUser
                        )
                      }
                    >
                      <span>{`${seluser.firstname} ${seluser.lastname}`}</span>
                      {/* <span>{seluser.email}</span> */}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="tips">
          <p>
            Tips: Not sure who's available already? Search ( <span>Anish</span>
            ). We can have a chat 😉
          </p>
        </div>
      </div>
    </GetStartedStyle>
  );
};

export default GetStarted;
