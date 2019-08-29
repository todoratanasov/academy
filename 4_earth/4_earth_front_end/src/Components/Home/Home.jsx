import React, { useEffect, useState, useContext } from "react";
import VideoContext from "../../context/video-context";

export default function() {
  const videoContext = useContext(VideoContext);

  const [stateVideo, setStateVideo] = useState(videoContext);

  const [stateVideosDb, setVideosDb] = useState([
    "/video/2.mp4",
    "/video/3.mp4",
    "/video/4.mp4",
    "/video/5.mp4",
    "/video/6.mp4"
  ]);

  const mouseEnterHandler = event => {
    event.target.play();
    console.log(event.target);
  };

  const mouseLeaveHandler = event => {
    event.target.pause();
  };

  return (
    <div id="home" className="homeContainer">
      <h1>
        This is our planet and our only real <span>HOME</span>!
      </h1>
      <div>
        <div className="videoContainer">
          <video
            src={process.env.PUBLIC_URL + videoContext.video1}
            loop
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            poster={process.env.PUBLIC_URL + videoContext.poster1}
          />
        </div>
        <div className="videoContainer">
          <video
            src={process.env.PUBLIC_URL + videoContext.video2}
            loop
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            poster={process.env.PUBLIC_URL + videoContext.poster2}
          />
        </div>
        <div className="videoContainer">
          <video
            src={process.env.PUBLIC_URL + videoContext.video3}
            loop
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            poster={process.env.PUBLIC_URL + videoContext.poster3}
          />
        </div>
        <div className="videoContainer">
          <video
            src={process.env.PUBLIC_URL + videoContext.video4}
            loop
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            poster={process.env.PUBLIC_URL + videoContext.poster4}
          />
        </div>
        <div className="videoContainer">
          <video
            src={process.env.PUBLIC_URL + videoContext.video5}
            loop
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            poster={process.env.PUBLIC_URL + videoContext.poster5}
          />
        </div>
        <div className="videoContainer">
          <video
            src={process.env.PUBLIC_URL + videoContext.video6}
            loop
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            poster={process.env.PUBLIC_URL + videoContext.poster6}
          />
        </div>
      </div>
    </div>
  );
}
