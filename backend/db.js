const mongoose = require("mongoose");
const { string } = require("zod");
mongoose.connect("mongodb://localhost:27017/paytm");

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = {User};