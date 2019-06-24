const UserModel = require("../models/User");
const ResultModel = require("../models/Result");

module.exports = {
  resultPost: async (req, res) => {
    const _id = req.params.id.substr(1);
    const data = req.body;
    try {
      const result = await ResultModel.create({
        correct: data.correct,
        incorrect: data.incorrect,
        user: [_id]
      }).then(async result => {
        const resultId = result._id;
        const userDb = await UserModel.findById({ _id });
        userDb.results.push(resultId);
        userDb.save();
        res.status(201).json({
          message: "Result was save!"
        });
      });
    } catch (err) {
      console.log(`This is an erro from retreiving an user from db ${err}`);
    }
  }
};
