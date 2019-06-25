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
      .populate('results')
      .then(result => {
        const data ={
          games:0,
          correct:0,
          incorrect:0
        }
        result.results.forEach(element => {
          data.games++;
          data.correct+=element.correct;
          data.incorrect+=element.incorrect;
        });
        data.user = result.username;
        data.userId = result._id;
        res.status(201).json(data);
      })
      .catch(err => {
        console.log(
          `This is an error from retreiving the user from the DB ${err}`
        );
      });
  },
  editPost:(req,res)=>{
    console.log(res.body)
  }
};
