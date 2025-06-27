const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const { JWTSECRET } = require("../config");
const zod = require("zod");
const router = express.Router();


const signupSchema = zod.object({
    username: zod.string().email({message:"Invalid email"}),
    firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string(),

})


router.post("/signup", async (req,res)=>{
    
    const body = req.body;

    const {success} = signupSchema.safeParse(body);

    if(!success){
        return res.status(411).json({message:"Email already taken / Incorrect inputs"});
    }

    const user = User.findOne({username:body.username});

    if(user._id){
        return res.status(411).json({message:"Email already taken"});
    }

    const dbUser = await User.create(body);

    const token = jwt.sign({userId:dbUser._id},JWTSECRET);

    res.status(200).json({message: "User created",
        token: token
    });


    
})

module.exports = router;