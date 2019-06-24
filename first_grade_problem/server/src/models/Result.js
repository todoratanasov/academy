const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultShema = new Schema({
  correct: { type: Schema.Types.Number, required: true },
  incorrect: { type: Schema.Types.Number, required: true },
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Result", resultShema);
