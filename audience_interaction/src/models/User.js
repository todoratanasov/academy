const mongoose = require("mongoose");
const encryption = require("../util/encription");
const Schema = mongoose.Schema;
//we set the parameters of the User model that saves data in the DB
const userSchema = new Schema({
  hashedPassword: { type: Schema.Types.String, required: true },
  username: { type: Schema.Types.String, required: true, unique: true },
  salt: { type: Schema.Types.String, required: true },
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }]
});
//we attach this method in order to verify that the data from the front-end is correct
userSchema.method({
  authenticate: function(password) {
    const currentHashedPass = encryption.generateHashedPassword(
      this.salt,
      password
    );
    return currentHashedPass === this.hashedPassword;
  }
});

module.exports = mongoose.model("User", userSchema);
