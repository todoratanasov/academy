const Router = function(name, routes) {
  return {
    name,
    routes
  };
};

exports.router = new Router("router", [
  {
    path: "/",
    name: "Home"
  },
  {
    path: "/register",
    name: "Register"
  },
  {
    path: "/login",
    name: "Login"
  },
  {
    path: "/standing",
    name: "Standing"
  },
  {
    path: "/stats",
    name: "Personal stats"
  }
]);
