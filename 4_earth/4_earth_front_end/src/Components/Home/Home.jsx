import React from "react";

const home = () => {
  return (
    <div id="#" className="homeContainer">
      <h1>This is Home screen</h1>
      <video src={process.env.PUBLIC_URL + "home.mp4"} autoPlay loop />
    </div>
  );
};

export default home;
