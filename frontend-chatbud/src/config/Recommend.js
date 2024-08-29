import React from "react";
import { GlobalChat } from "../context/ChatContext";
import TextField from "@mui/material/TextField";

const Recommend = ({ props }) => {
  const { setKeyword, keyword, setSearchResults, label, setisLoading } = props;
  const { user } = GlobalChat();


  const getUserToken = localStorage.getItem("usertoken");




  //after change in typing input Field backend connection
  const handleSearch = async (event) => {
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
            authorization: `Bearer ${getUserToken || user?.tokens[0].token}`, //throws a token
          },
          method: "GET"
        };
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/search?keyword=${encodeURIComponent(value)}`, //here symbols will be replaced as ""
          config
        );
        const users = await response.json();

        if (!users) {
          setSearchResults();
        } else {
          setSearchResults(users);
          setisLoading(false);
        }
      } catch {
        console.error("Failed searching:");
      }
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
          style={{ width: "100%" }}
          value={keyword}
          onChange={handleSearch}

        />
      </form>
    </>
  );
};

export default Recommend;
