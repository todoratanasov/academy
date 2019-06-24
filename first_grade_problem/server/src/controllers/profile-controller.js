const path = require("path");

module.exports = {
  statsGet: (req, res) => {
    res
      .status(201)
      .sendFile(
        path.join(__dirname, "../views/profile/profile-homescreen.html")
      );
  }
};
