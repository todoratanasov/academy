import { getData } from "./storage";
exports.toggle = () => {
  const username = getData("username");
  //we show/hide buttons depending on if the user is loggedin
  if (username) {
    document.getElementById("logout").removeAttribute("class", "hidden");
    document.getElementById("standings").removeAttribute("class", "hidden");
    document.getElementById("profile").removeAttribute("class", "hidden");
    document.getElementById("game").removeAttribute("class", "hidden");

    document.getElementById("register").setAttribute("class", "hidden");
    document.getElementById("login").setAttribute("class", "hidden");

    document.getElementById(
      "greeting"
    ).innerText = `Hello, ${username}! It's time to play the game!`;
  }
};
