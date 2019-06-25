const path = require("path");
//we send the requested files
module.exports = {
  statsGet: (req, res) => {
    res
      .status(201)
      .sendFile(
        path.join(__dirname, "../views/profile/profile-homescreen.html")
      );
  }
};
