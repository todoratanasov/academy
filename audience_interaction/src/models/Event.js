const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: { type: Schema.Types.String, required: true},
  description: { type: Schema.Types.String, required: true },
  isActive: { type: Schema.Types.Boolean, default: true },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }]
});

module.exports = mongoose.model("Event", eventSchema);
