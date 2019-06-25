const path = require("path");
//we send the requested files
module.exports = {
  standingsGet: (req, res) => {
    res.sendFile(
      path.join(__dirname, "../views/standings/standings-homescreen.html")
    );
  },
  resultsGet: (req, res) => {}
};
