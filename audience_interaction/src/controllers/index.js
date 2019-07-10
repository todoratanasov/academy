//here we export all routes as an object of modules
const user = require("./user-controller");
const event = require("./event-controller");
const message = require("./message-controller");
module.exports = {
  user,
  event,
  message
};
