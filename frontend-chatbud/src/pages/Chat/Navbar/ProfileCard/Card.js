import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { GlobalChat } from "../../../../context/ChatContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { ProfileCardStyle } from "../../../../components/ChatStyle/Navbar/ProfileCard/ProfileCard.styled";
import CardMedia from "@mui/material/CardMedia";

const ProfileCard = ({ handleDialogClose, opendialog }) => {
  const { user } = GlobalChat();

  return (
    <ProfileCardStyle>
      {user ? (
        <Dialog
          open={opendialog}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Card sx={{ maxWidth: 345, minWidth: 200 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={require("../../../../images/664c4a47219ce4fcba5e8d78bab0a97c.jpg")}
              title="profile_img"
            />
            <CardContent className="card_content">
              <div
                className="name"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textTransform: "capitalize",
                  marginBottom: 10,
                }}
              >
                <Typography gutterBottom variant="p" component="div">
                  FullName:
                </Typography>
                <Typography
                  gutterBottom
                  variant="p"
                  component="div"
                  style={{ color: "rgb(9, 18, 86)", fontWeight: "bold" }}
                >
                  {user.firstname}
                  {user.lastname}
                </Typography>
              </div>
              <div
                className="name"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography gutterBottom variant="p" component="div">
                  Email:
                </Typography>
                <Typography
                  gutterBottom
                  variant="p"
                  component="div"
                  style={{ color: "rgb(9, 18, 86)", fontWeight: "bold" }}
                >
                  {user.email}
                </Typography>
              </div>
            </CardContent>
          </Card>

          <DialogActions>
            <Button onClick={handleDialogClose}>Close</Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </ProfileCardStyle>
  );
};

export default ProfileCard;
