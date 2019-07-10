const crypto = require("crypto");
//we generate salt and hashed password so that it can be stored not in readible way
module.exports = {
  generateSalt: () => crypto.randomBytes(128).toString("base64"),
  generateHashedPassword: (salt, password) =>
    crypto
      .createHmac("sha256", salt)
      .update(password)
      .digest("hex")
};
