const mongoose = require('mongoose');

const server = "ds235417.mlab.com:35417";
const database = "first_grade_problems";
const user = "atanasov.t";
const password = "fs23Z9a";

mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`);

let CustomerSchema = new mongoose.Schema({
    name: String,
    email: {type: String, required: true, unique:true}
});

module.exports = mongoose.model('Customer', CustomerSchema);