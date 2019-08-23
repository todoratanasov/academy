import React from "react";

const header = () => {
  return (
    <header className="headerContainer">
      <div className="logo" />
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>
          <a href="#campaings">Campaings</a>
        </li>
        <li>
          <a href="#polutionMap">Report polution</a>
        </li>
        <li>Donation</li>
      </ul>
    </header>
  );
};

export default header;
