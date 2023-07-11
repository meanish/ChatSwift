import React from "react";
import { GlobalChat } from "../context/ChatContext";
import TextField from "@mui/material/TextField";

const Recommend = ({ props }) => {
  const { setKeyword, keyword, setSearchResults, label, setisLoading } = props;
  const { user } = GlobalChat();

  //after change in typing input Field backend connection
  const handleSearch = async (event) => {
    event.preventDefault();
    const value = event.target.value;
    setKeyword(value);
    setisLoading(true);
    if (value === "" || value === "*") {
      setSearchResults([]);
      setisLoading(false);
    } else if (value === "*" || /[~!@#$%^&*()_+]/.test(value)) {
      setSearchResults([]);
      // Handle symbol input behavior here, such as displaying a message or ignoring the search
      // You can add specific logic to handle symbol inputs as per your requirements
    } else {
      try {
        const config = {
          headers: {
            authorization: `Bearer ${user.tokens[0].token}`, //throws a token
          },
        };
        const response = await fetch(
          `/search?keyword=${encodeURIComponent(value)}`, //here symbols will be replaced as ""
          config
        );
        const users = await response.json();

        if (!users) {
          setSearchResults();
        } else {
          setSearchResults(users);
          setisLoading(false);
        }
      } catch (error) {
        console.error("Failed searching:", error);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      handleSearch(event); // Call handleSearch function
    }
  };

  return (
    <>
      <form
        className="search-box"
        action=""
        method="post"
        onSubmit={(event) => event.preventDefault()}
      >
        <TextField
          id="outlined-basic"
          label={label}
          variant="outlined"
          style={{ width: 200 }}
          value={keyword}
          onChange={handleSearch}
          onSubmit={handleSearch}
          onKeyPress={handleKeyPress}
        />
      </form>
    </>
  );
};

export default Recommend;
