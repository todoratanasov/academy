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
    method:"GET"
  },
  {
    path: "/user/register",
    name: "Register",
    method:"GET"
  },
  {
    path: "/user/login",
    name: "Login",
    method:"GET"
  },
  {
    path: "/standing",
    name: "Standing",
    method:"GET"
    
  },
  {
    path: "/stats",
    name: "Personal stats",
    method:"GET"
  }
]);
