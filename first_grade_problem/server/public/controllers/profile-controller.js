import { sendRequest } from "../helpers/requester";
import { getData } from "../helpers/storage";
import{toggle} from "../helpers/toggle-layout";
import{updateProfile} from "../helpers/profile-update";
const container = document.getElementById("container");
//statsGet sends a GET request to the back-end to get the user's personal stats and another GET request to get the html. After the data is combined we render it
exports.statsGet = html => {
  toggle();
  const userId = getData("userId");

  sendRequest(`/profile/result:${userId}`, "GET")
    .then(result => {
      const htmlParsed = Mustache.to_html(html, result.data);
      container.innerHTML = htmlParsed;
      const editButton = document.getElementById("edit-user-button");
      const userId = editButton.getAttribute("data-userId");
      editButton.addEventListener("click", updateProfile(userId));    
    })
    .catch(err => {
      console.log(`This is an error from retreiving personal stats ${err}`);
    });
  container.innerHTML = html;
};
