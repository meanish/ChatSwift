import React, { useState, useEffect } from "react";
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
import { styled } from "@mui/material/styles"; // Import styled
import toast from 'react-hot-toast';



// Styled component using `styled` utility
const FormRoot = styled('form')(({ theme }) => ({
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
}));

const LoginForm = ({ handleClose }) => {
  const { setSocketConnected, setUser, setchatList } = GlobalChat();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const UserchatData = async () => {
      const userData = JSON.parse(localStorage.getItem("userData"));

      if (userData) {
        navigate("/chat");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.errors) {
        setErrors(data.errors);
      } else {
        toast.success("Sucessfully Login.")

        localStorage.setItem("userData", JSON.stringify(data.userData));
        setUser(data.userData);
        localStorage.setItem("usertoken", data.token);

        const config = {
          headers: {
            authorization: `Bearer ${data.token}`,
          },
        };
        const chatResponse = await axios.get(`${process.env.REACT_APP_API_URL}/chat/api`, config);

        setchatList(chatResponse.data);
        localStorage.setItem("UserChatList", JSON.stringify(chatResponse.data));

        socket.on("connected", () => {
          if (chatResponse.data) {
            setSocketConnected(true);
            chatResponse.data.forEach((chat) => {
              const room = chat._id;
              socket.emit("join_room", room);
            });
          }
        });

        navigate("/chat");
      }
    } catch {
      console.log("Error in react");
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
              <FormRoot onSubmit={handleSubmit}>
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
              </FormRoot>
            </div>
          </div>
        </div>
      </div>
    </FormStyle>
  );
};

export default LoginForm;
