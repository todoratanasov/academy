import requester from "../helpers/requester";
import { toggle } from "../helpers/toggle-layout";
//homeGet sends a GET request to the back-end and renders the returned html
exports.homeGet = () => {
  requester
    .sendRequest("/home/homescreen", "GET")
    .then(result => {
      const html = result.data;
      container.innerHTML = html;
      toggle();
    })
    .catch(err => {
      console.log(`Backend error ${err}`);
    });
};
