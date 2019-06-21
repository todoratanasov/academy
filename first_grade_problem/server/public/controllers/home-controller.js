import requester from "../helpers/requester";
exports.homeGet = ()=>{
  requester.sendRequest("/home/homescreen", "GET")
  .then(result => {
    const html = Mustache.to_html(result.data);
    container.innerHTML = html;
  })
  .catch(err => {
    console.log(`backend error ${err}`);
  });
}
