//here we export all routes as an object of modules
const user = require("./user-route");
const home = require("./home-route");
const game = require("./game-route");
const profile = require("./profile-route");
const standings = require("./standings-route");
const result = require("./result-route");
module.exports = {
  user,
  home,
  game,
  profile,
  standings,
  result
};
