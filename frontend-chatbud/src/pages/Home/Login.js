import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { GlobalChat } from "../../context/ChatContext";
import Navbar from "./Navbar";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import axios from "axios";
import socket from "../../config/socket";

import { FormStyle } from "../../components/Home/RegisterStyle.styled";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

const LoginForm = ({ handleClose }) => {
  const { setSocketConnected, setUser, setchatList } = GlobalChat();
  const classes = useStyles();
  const navigate = useNavigate();
  // create state variables for each input

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const UserchatData = async () => {
      const userData = JSON.parse(localStorage.getItem("userData"));

      if (userData) {
        //socket disconnected here
        navigate("/chat"); // If not logged in, redirect to the login page
        return;
      }
    };

    UserchatData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  //login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    //catching the data send from the backend
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.errors) {
        setErrors(data.errors);
      } else if (!data.errors) {
        console.log("After login get data", data);
        //login was sucess now lets localStoarage
        // Save user details to local storage and set the user state
        localStorage.setItem("userData", JSON.stringify(data));

        //get the chatlist and setItem
        try {
          const config = {
            headers: {
              authorization: `Bearer ${data.tokens[0].token}`, //throws a token
            },
          };
          const response = await axios.get("/chat/api", config);

          localStorage.setItem("usertoken", data.tokens[0].token);

          setchatList(response.data);

          localStorage.setItem("UserChatList", JSON.stringify(response.data));

          //if new register Display something new page

          if (response.data) {
            setSocketConnected(true);

            //when us connectes enteres to all room which is being cretaed
            response.data.forEach((chat) => {
              const room = chat._id;
              socket.emit("join_room", room);
            });
          }
        } catch (e) {
          console.log("failed to get a chatList");
        }

        setUser(data); //set the user

        navigate("/chat");
      }
    } catch (error) {
      console.log("Error in react", error);
    }
  };

  return (
    <FormStyle>
      <div className="login">
        <Navbar />
        <div className="login_container">
          <div className="login_form_page">
            <div className="logo_section">
              <img
                src={require("../../images/logobird.png")}
                alt="logo.png"
                className="small-logo"
              />
            </div>
            <div className="login-top">
              <h1>Login to your account</h1>
            </div>
            <div className="login-form">
              <form className={classes.root} onSubmit={handleSubmit}>
                <div className="email_login">
                  <EmailIcon className="custom-icon" />
                  <TextField
                    label="Email"
                    variant="filled"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email || ""}
                    style={{ width: 200 }}
                    inputProps={{
                      style: {
                        height: "08px",
                      },
                    }}
                  />
                </div>
                <div className="password_login">
                  <KeyIcon className="custom-icon" />
                  <TextField
                    label="Password"
                    variant="filled"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password || ""}
                    style={{ width: 200 }}
                    inputProps={{
                      style: {
                        height: "08px",
                      },
                    }}
                  />
                </div>

                <div>
                  <NavLink to="/">
                    <Button
                      variant="contained"
                      className="submit_btn"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                  </NavLink>
                  <Button
                    type="submit"
                    variant="contained"
                    className="submit_btn"
                  >
                    Login
                  </Button>
                </div>
                <div className="new_register">
                  Don't have an account yet?
                  <NavLink to="/register" className="register_link">
                    Register One
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </FormStyle>
  );
};

export default LoginForm;
