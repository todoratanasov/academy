import requester from "../helpers/requester";
//homeGet sends a GET request to the back-end and renders the returned html
exports.homeGet = () => {
  requester
    .sendRequest("/home/homescreen", "GET")
    .then(result => {
      const html = result.data;
      container.innerHTML = html;
    })
    .catch(err => {
      console.log(`backend error ${err}`);
    });
};
