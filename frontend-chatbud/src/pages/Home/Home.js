import Navbar from "./Navbar";
import { React } from "react";
import YouTubeLink from "./Youtube/YoutubeLink";

const Home = () => {
  const videoUrl = "https://www.youtube.com/watch?v=GDSIm4-Hz7g";
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
