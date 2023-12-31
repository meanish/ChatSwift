import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HttpsIcon from "@mui/icons-material/Https";
import Navbar from "./Navbar";
import { FormStyle } from "../../components/Home/RegisterStyle.styled";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

const options = {
  position: "bottom-right",
  style: {
    backgroundColor: "transparent",
    boxShadow: "none",
    color: "white",
    fontFamily: "Menlo, monospace",
    fontSize: "15px",
    textAlign: "center",
  },
};

const RegisterForm = ({ handleClose }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [openSnackbar] = useSnackbar(options);
  // create state variables for each input
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!data.errors) {
        openSnackbar(
          <p
            className="snack-add"
            style={{
              backgroundColor: "green",
              padding: "4px",
              borderRadius: "7px",
            }}
          >
            Sucessfully registered.
          </p>,
          [2000]
        );
        navigate("/"); // Redirect to home page
      } else if (data.errors) {
        setErrors(data.errors);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormStyle>
      <div className="register">
        <Navbar />
        <div className="register_container">
          <div className="register_form_page">
            <div className="logo_section">
              <img
                src={require("../../images/logobird.png")}
                alt="logo.png"
                className="small-logo"
              />
            </div>
            <div className="register-top">
              <h1>Register a new account</h1>
            </div>
            <div className="register-form">
              <form className={classes.root} onSubmit={handleSubmit}>
                <div className="name_login">
                  <AccountBoxIcon className="custom-icon" />
                  <TextField
                    label="Firstname"
                    variant="filled"
                    name="firstname"
                    value={formData.firstname}
                    error={!!errors.firstname}
                    helperText={errors.firstname || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="name_login">
                  <AccountBoxIcon className="custom-icon" />
                  <TextField
                    label="Lastname"
                    name="lastname"
                    variant="filled"
                    error={!!errors.lastname}
                    helperText={errors.lastname || ""}
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                </div>
                <div className="email_login">
                  <EmailIcon className="custom-icon" />
                  <TextField
                    label="Email"
                    name="email"
                    variant="filled"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email || ""}
                  />
                </div>
                <div className="address_login">
                  <AccountBoxIcon className="custom-icon" />
                  <TextField
                    label="Address"
                    name="address"
                    variant="filled"
                    value={formData.address}
                    onChange={handleChange}
                    error={!!errors.address}
                    helperText={errors.address || ""}
                  />
                </div>
                <div className="password_login">
                  <KeyIcon className="custom-icon" />
                  <TextField
                    label="Password"
                    name="password"
                    variant="filled"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password || ""}
                  />
                </div>
                <div className="password_login">
                  <HttpsIcon className="custom-icon" />
                  <TextField
                    label="Confirm Password"
                    name="password_confirmation"
                    variant="filled"
                    type="password"
                    error={!!errors.password_confirmation}
                    helperText={errors.password_confirmation || ""}
                    value={formData.password_confirmation}
                    onChange={handleChange}
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
                    className="submit_btn"
                    variant="contained"
                  >
                    Register
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </FormStyle>
  );
};

export default RegisterForm;
