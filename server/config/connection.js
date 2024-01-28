require("dotenv").config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost:27017/passwordManager");
console.log("MONGODB_URI:", process.env.MONGODB_URI);
module.exports = mongoose.connection;