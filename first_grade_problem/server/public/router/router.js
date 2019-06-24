const Router = function(name, routes, method) {
  return {
    name,
    routes,
    method
  };
};

exports.router = new Router("router", [
  {
    path: "/",
    name: "Home",
    method: "GET"
  },
  {
    path: "/user/register",
    name: "Register",
    method: "GET"
  },
  {
    path: "/user/login",
    name: "Login",
    method: "GET"
  },
  {
    path: "/standings/index",
    name: "Standings",
    method: "GET"
  },
  {
    path: "/profile/stats",
    name: "Personal stats",
    method: "GET"
  },
  {
    path: "/game/types",
    name: "Game",
    method: "GET"
  },
  {
    path: "/logout",
    name: "Logout",
    method: "POST"
  },
  {
    path: "/game/single",
    name: "Single game",
    method: "GET"
  },
  {
    path: "/game/chalenge",
    name: "Chalenge game",
    method: "GET"
  }
]);
