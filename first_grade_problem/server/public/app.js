import { sendRequest } from "./helpers/requester";
import { router } from "./router/router";
import { Mustache } from "sammy";
//here we get the current path
const currentPath = window.location.pathname;
const container = document.getElementById("container");

if (currentPath === "/") {
  //   sendRequest("/test", "GET")
  //     .then(result => {
  //       const data = { title: "Hello" };
  //       const html = Mustache.to_html(result.data, data);
  //       container.innerHTML = html;
  //     })
  //     .catch(err => {
  //       console.log(`backend error ${err}`);
  //     });
  //question как да си взема
  let sample = document.getElementById("personTpl").innerHTML;
  let data = { title: "Hi" };
  let html = Mustache.to_html(sample, data);
  container.innerHTML = html;
  console.log(sample);
} else {
  const route = router.routes.filter(r => {
    return r.path === currentPath;
  })[0];
  console.log(route);
  if (route) {
    //here we do back-end requests for the view

    const url = route.path;
    console.log(url);
  } else {
    container.innerHTML = '<div class="wrong-url">404 wrong URL</div>';
  }
}
