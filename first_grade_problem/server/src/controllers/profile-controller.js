const path = require("path");
const UserModel = require("../models/User");
//we send the requested files
module.exports = {
  statsGet: (req, res) => {
    res
      .status(201)
      .sendFile(
        path.join(__dirname, "../views/profile/profile-homescreen.html")
      );
  },
  resultsGet: async (req, res) => {
    const _id = req.params.id.substr(1);
    const user = await UserModel.findById({ _id })
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(
          `This is an error from retreiving the user from the DB ${err}`
        );
      });
    console.log(req.params);
  }
};
