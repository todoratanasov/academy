import { sendRequest } from "../helpers/requester";
import { getData } from "../helpers/storage";
const container = document.getElementById("container");
exports.statsGet = html => {
  const userId = getData("userId");

  sendRequest(`/profile/result:${userId}`, "GET")
    .then(result => {})
    .catch(err => {
      console.log(`This is an error from retreiving personal stats ${err}`);
    });
  container.innerHTML = html;
};
