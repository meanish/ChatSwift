import React from "react";

const YouTubeLinkDiv = ({ videoUrl }) => {
  // Extracting the video ID from the YouTube URL
  const videoId = videoUrl.split("v=")[1];

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube Video"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeLinkDiv;
