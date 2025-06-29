const mongoose = require("mongoose");
// const { String } = require("zod");
mongoose.connect("mongodb://localhost:27017/paytm");

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
});

const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: Number
});

const Account = mongoose.model("Account", AccountSchema);
const User = mongoose.model("User", UserSchema);

module.exports = {User , Account};