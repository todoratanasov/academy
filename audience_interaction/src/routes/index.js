//here we export all routes as an object of modules
const user = require("./user-route");
const event = require("./event-route");
module.exports = {
  user,
  event
};
