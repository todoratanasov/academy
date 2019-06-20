import { sendRequest } from "./helpers/requester";
import { router } from "./router/router";
//import { Mustache } from "sammy";
import template from "./views/home/home.mst"
//here we get the current path
const currentPath = window.location.pathname;
const container = document.getElementById("container");

if (currentPath === "/") {
    sendRequest("/home/homescreen", "GET")
      .then(result => {
        const html = Mustache.to_html(result.data);
        container.innerHTML = html;
      })
      .catch(err => {
        console.log(`backend error ${err}`);
      });
} else {
  const route = router.routes.filter(r => {
    return r.path === currentPath;
  })[0];
  console.log(route);
  if (route) {
    const method = route.method;
    const url = route.path;
    console.log(url)
    sendRequest(url,method)
      .then((result)=>{
        const html = Mustache.to_html(result.data);
        container.innerHTML = html;
        if(url==="/user/register"){
          document.getElementById("registerForm").onsubmit = function(event) {
            console.log(event)
        }
        }
      })
      .catch(err => {
        console.log(`backend error ${err}`);
      });
  } else {
    container.innerHTML = '<div class="wrong-url">404 wrong URL</div>';
  }
}
