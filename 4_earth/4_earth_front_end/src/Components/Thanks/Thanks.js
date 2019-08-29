import React from "react";

export default function(props) {
  return (
    <div className="thankYou">
      <h3>{props.title}</h3>
      <img src={process.env.PUBLIC_URL + "logo.png"} alt="logo"></img>
    </div>
  );
}
