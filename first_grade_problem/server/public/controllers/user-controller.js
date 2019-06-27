import requester from "../helpers/requester";
import { saveData } from "../helpers/storage";
import { deleteData } from "../helpers/storage";
import { toggle } from "../helpers/toggle-layout";
const toastr = require("toastr");
const container = document.getElementById("container");
//this just renders the login form
exports.loginGet = html => {
  toggle();
  container.innerHTML = html;
};
//loginPost sends a POST request to the back-end along with the collected data from the login form as an object
exports.loginPost = () => {
  document.getElementById("loginForm").onsubmit = event => {
    event.preventDefault();
    event.stopPropagation();

    const inputs = event.target.elements;

    const email = btoa(inputs["email"].value);
    const password = btoa(inputs["password"].value);
    if (!email || !password) {
      toastr.warning("Please fill all fields");
      return;
    }
    if (/\s/.test(email) || /\s/.test(password)) {
      toastr.warning("Please don't use space in the input fields");
      return;
    }
    const data = { email, password };

    requester
      .sendRequest("/user/login", "POST", data)
      .then(result => {
        const { token, email, username, userId } = result.data;
        //the returned data is stored in the localStorage
        saveData("token", token);
        saveData("email", email);
        saveData("username", username);
        saveData("userId", userId);

        window.location.href = "/";
      })
      .catch(err => {
        toastr.warning("Please check user and password again");
        console.log(`This is an error from login ${err}`);
      });
  };
};
//logoutPost deletes the token and the data from the localStorage
exports.logoutPost = () => {
  deleteData();
  window.location.href = "/";
};
//registerGet renders the register form
exports.registerGet = html => {
  toggle();
  container.innerHTML = html;
};
//registerPost sends a POST requiest to the back-end along with the collected data from the register form as an object
exports.registerPost = html => {
  document.getElementById("registerForm").onsubmit = event => {
    event.preventDefault();
    event.stopPropagation();

    const inputs = event.target.elements;
    const email = inputs["email"].value;
    const username = inputs["username"].value;
    const password = inputs["password"].value;
    if (!email || !username || !password) {
      toastr.warning("Please fill all fields");
      return;
    }
    if (/\s/.test(email) || /\s/.test(username) || /\s/.test(password)) {
      toastr.warning("Please don't use space in the input fields");
      return;
    }

    const data = {
      email: btoa(email),
      username: btoa(username),
      password: btoa(password)
    };

    requester
      .sendRequest("/user/register", "POST", data)
      .then(result => {
        const { token, email, username, userId } = result.data;
        //the returned data is stored in the localStorage
        saveData("token", token);
        saveData("email", email);
        saveData("username", username);
        saveData("userId", userId);

        window.location.href = "/";
      })
      .catch(err => {
        toastr.warning("This user already exists!");
      });
  };
};
