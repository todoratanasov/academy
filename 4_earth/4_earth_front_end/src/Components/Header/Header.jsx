import React from "react";

const header = () => {
  return (
    <header className="headerContainer">
      <a href="#">
        <img src={process.env.PUBLIC_URL + "logo.png"} alt="logo"></img>
      </a>

      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#polutionMap">Report pollution</a>
        </li>
        <li>
          <a href="#campaings">Campaings</a>
        </li>
        <li>
          <a href="#donationsContainer">Donation</a>
        </li>
      </ul>
    </header>
  );
};

export default header;
