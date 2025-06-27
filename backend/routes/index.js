const express = require("express");

const router = express.Router();

const app=express();
const user = require("./user")

app.use("/user",user)

module.exports = router;