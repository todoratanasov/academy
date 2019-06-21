import { sendRequest } from "./helpers/requester";
import { router } from "./router/router";
import userController from "./controllers/user-controller";
import homeController from "./controllers/home-controller"
const currentPath = window.location.pathname;
const container = document.getElementById("container");

if (currentPath === "/") {
    homeController.homeGet();
} else {
  const route = router.routes.filter(r => {
    return r.path === currentPath;
  })[0];
  if (route) {
    const method = route.method;
    const url = route.path;
    sendRequest(url,method)
      .then((result)=>{
        const data = {firstNumber:1,action:"+",secondNumber:3}
        const html = Mustache.to_html(result.data,data);
        container.innerHTML = html;
        //todo to insert if/else if for every url becouse mustache wants every route with {{}} to have data
        if(url==="/user/register"){
          userController.registerPost();
        }
      })
      .catch(err => {
        console.log(`backend error ${err}`);
      });
  } else {
    container.innerHTML = '<div class="wrong-url">404 wrong URL</div>';
  }
}


// how to use HTML files!!!!!
//import html from "location"
//const h1 = document.createRange().createContextualFragment(html)
//document.body.appendChild(h1)

//templating engine best
//mozzila/nunjucks