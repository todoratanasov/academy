import requester from "../helpers/requester";
import { saveData } from "../helpers/storage";
import { deleteData } from "../helpers/storage";
const toastr = require("toastr");
const container = document.getElementById("container");
exports.loginGet = html => {
  container.innerHTML = html;
};
exports.loginPost = () => {
  document.getElementById("loginForm").onsubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    const inputs = event.target.elements;
    const email = btoa(inputs["email"].value);
    const password = btoa(inputs["password"].value);

    const data = { email, password };
    requester
      .sendRequest("/user/login", "POST", data)
      .then(result => {
        const { token, email, username, userId } = result.data;
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
exports.logoutPost = () => {
  deleteData();
  window.location.href = "/";
};
exports.registerGet = html => {
  container.innerHTML = html;
};
exports.registerPost = html => {
  document.getElementById("registerForm").onsubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    const inputs = event.target.elements;
    const email = btoa(inputs["email"].value);
    const username = btoa(inputs["username"].value);
    const password = btoa(inputs["password"].value);

    const data = { email, username, password };

    requester
      .sendRequest("/user/register", "POST", data)
      .then(result => {
        const { token, email, username, userId } = result.data;
        saveData("token", token);
        saveData("email", email);
        saveData("username", username);
        saveData("userId", userId);
        window.location.href = "/";
      })
      .catch(err => {
        console.log(`this is register error ${err}`);
      });
  };
};
