const mongoose = require("mongoose");
const server = "ds351827.mlab.com:51827";
const database = "audience_interaction";
const user = "atanasov.t";
const password = "a327386";
//we configure the connection with the DB
module.exports = {
  database: () =>
    mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`)
};
