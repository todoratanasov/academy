const path = require("path");
//we send the requested files
module.exports = {
  homescreenGet: (req, res) => {
    res.sendFile(path.join(__dirname, "../views/home/homescreen.html"));
  }
};
