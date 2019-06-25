import{getData} from "./storage";
exports.toggle = ()=>{
    const username = getData("username");
      //we show/hide buttons depending on if the user is loggedin
      if(username){
        document.getElementById("logout").removeAttribute("hidden");
        document.getElementById("standings").removeAttribute("hidden");
        document.getElementById("profile").removeAttribute("hidden");
        document.getElementById("game").removeAttribute("hidden");

        document.getElementById("register").setAttribute("hidden","true");
        document.getElementById("login").setAttribute("hidden","true");

        document.getElementById("greeting").innerText = `Hello, ${username}! It's time to play the game!`;
      }
}