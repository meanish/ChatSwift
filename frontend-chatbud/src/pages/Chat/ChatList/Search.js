import React, { useState, Fragment } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { GlobalChat } from "../../../context/ChatContext";
import { styled } from "@mui/system";
import Recommend from "../../../config/Recommend";
import { GetChat } from "../../../config/ChatLogic";
import { GlobalMessage } from "../../../context/MessengerContext";
import Tooltip from "@mui/material/Tooltip";
import Loader from "../../../config/oldMessageLoader.js";

const SearchDrawer = () => {
  const [state, setState] = useState({
    left: false,
  });
  const { user, setchatList, setclickUser } = GlobalChat();
  const { RestoreselectedChat } = GlobalMessage();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleGetChat = (id, anchor) => () => {
    GetChat(user, id, setchatList, RestoreselectedChat, setclickUser); // Calling to get the chat between 2 no then create new
    setState({ ...state, [anchor]: false }); // Close the drawer by updating the state
  };

  const SearchDrawerStyle = styled("div")({
    padding: "10px",
  });

  const TooltipListItem = styled(ListItem)(() => ({
    width: 200,
    height: 50,
    padding: 10,
  }));
  //what to display
  const list = (anchor) => (
    <SearchDrawerStyle>
      <Recommend
        props={{
          setKeyword,
          keyword,
          setSearchResults,
          label: "Chat",
          setisLoading,
        }}
      />
      {isLoading ? (
        <div className="loader_container">
          <Loader />
        </div>
      ) : (
        <>
          {keyword && searchResults.length === 0 ? (
            <p className="nouser">No users found</p>
          ) : (
            <List>
              {searchResults.map((user) => (
                <Tooltip
                  title="Click to message"
                  placement="right-start"
                  key={user._id}
                >
                  <TooltipListItem onClick={handleGetChat(user._id, anchor)}>
                    <ListItemText
                      primary={`${user.firstname} ${user.lastname}`}
                      secondary={user.email}
                    />
                    <Divider />
                  </TooltipListItem>
                </Tooltip>
              ))}
            </List>
          )}
        </>
      )}
    </SearchDrawerStyle>
  );

  return (
    <>
      <div>
        <button onClick={toggleDrawer("left", true)}>
          <span className="long-text bubble-btn">Search</span>
        </button>
        <Drawer
          anchor="left"
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </div>
    </>
  );
};

export default SearchDrawer;
