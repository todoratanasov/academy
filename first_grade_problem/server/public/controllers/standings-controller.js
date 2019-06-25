const container = document.getElementById("container");
//standingsGet send a GET request to the back-end to get the results of all users and another GET request to get the html. Combines them and renders the html
exports.standingsGet = html => {
  container.innerHTML = html;
};
