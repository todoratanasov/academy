const mongoose = require("mongoose");
const server = "ds235417.mlab.com:35417";
const database = "first_grade_problems";
const user = "atanasov.t";
const password = "fs23Z9a";

module.exports = {
  database: () =>
    mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`)
};
