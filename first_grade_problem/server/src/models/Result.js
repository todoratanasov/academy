const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//we set the parameters of the Result model that saves data in the DB
const resultShema = new Schema({
  correct: { type: Schema.Types.Number, required: true },
  incorrect: { type: Schema.Types.Number, required: true },
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Result", resultShema);
