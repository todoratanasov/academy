import { sendRequest } from "./helpers/requester";
import { router } from "./router/router";
import userController from "./controllers/user-controller";
import homeController from "./controllers/home-controller";
import gameController from "./controllers/game-controller";
import profileController from "./controllers/profile-controller";
import standingsController from "./controllers/standings-controller";
import "./node_modules/toastr/build/toastr";
const currentPath = window.location.pathname;
//here we check if a route exists and if so we make GET request to the back-end and we call the controller with the returned html as a parameter
if (currentPath === "/") {
  homeController.homeGet();
} else {
  const route = router.routes.filter(r => {
    return r.path === currentPath;
  })[0];
  if (route) {
    const method = route.method;
    const url = route.path;

    if (url === "/logout") {
      userController.logoutPost();
    } else {
      sendRequest(url, method)
        .then(result => {
          const html = result.data;
          if (url === "/user/register") {
            userController.registerGet(html);
            userController.registerPost();
          } else if (url === "/user/login") {
            userController.loginGet(html);
            userController.loginPost();
          } else if (url === "/game/types") {
            gameController.gameIndexGet(html);
          } else if (url === "/profile/stats") {
            profileController.statsGet(html);
          } else if (url === "/standings/index") {
            standingsController.standingsGet(html);
          } else if (url === "/game/single") {
            gameController.gameSingleGet(html);
            gameController.gameSingleGenerate();
          }
        })
        .catch(err => {
          console.log(`backend error ${err}`);
        });
    }
  } else {
    container.innerHTML = '<div class="wrong-url">404 wrong URL</div>';
  }
}
