const container = document.getElementById("container");
import{toggle} from "../helpers/toggle-layout";
//standingsGet send a GET request to the back-end to get the results of all users and another GET request to get the html. Combines them and renders the html
exports.standingsGet = html => {
  toggle();
  container.innerHTML = html;
};
