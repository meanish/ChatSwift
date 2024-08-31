import Navbar from "./Navbar";
import { React, useEffect } from "react";
import YouTubeLink from "./Youtube/YoutubeLink";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const videoUrl = "https://www.youtube.com/watch?v=GDSIm4-Hz7g";

  const navigate = useNavigate();



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


  return (
    <>
      <Navbar />
      <div
        className="click"
        style={{
          fontSize: "25px",
          color: "rgb(37,55,117)",
          textAlign: "center",
          marginTop: "10%",
        }}
      >
        <YouTubeLink videoUrl={videoUrl} />
      </div>
    </>
  );
};

export default Home;
