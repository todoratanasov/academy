const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  event: { type: Schema.Types.ObjectId, ref: "Event" },
  content: { type: Schema.Types.String, required: true },
  upvote: { type: Schema.Types.Number, default: 0 },
  downvote: { type: Schema.Types.Number, default: 0 },
  votedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  isActive: { type: Schema.Types.Boolean, default: true }
});

module.exports = mongoose.model("Message", messageSchema);
