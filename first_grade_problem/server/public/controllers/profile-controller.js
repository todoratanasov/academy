import { sendRequest } from "../helpers/requester";
import { getData } from "../helpers/storage";
const container = document.getElementById("container");
//statsGet sends a GET request to the back-end to get the user's personal stats and another GET request to get the html. After the data is combined we render it
exports.statsGet = html => {
  const userId = getData("userId");

  sendRequest(`/profile/result:${userId}`, "GET")
    .then(result => {})
    .catch(err => {
      console.log(`This is an error from retreiving personal stats ${err}`);
    });
  container.innerHTML = html;
};
