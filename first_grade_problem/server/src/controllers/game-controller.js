const path = require("path");
//we send the requested files
module.exports = {
  gameIndexGet: (req, res) => {
    res.sendFile(path.join(__dirname, "../views/game/game-homescreen.html"));
  },
  gameSingleGet: (req, res) => {
    res.sendFile(path.join(__dirname, "../views/game/game-single.html"));
  },
  gamePlayboardGet: (req, res) => {
    res.sendFile(path.join(__dirname, "../views/game/game-playboard.html"));
  }
};
