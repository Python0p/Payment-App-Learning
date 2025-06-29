const express = require("express");
const jwt = require("jsonwebtoken");
const { User , Account} = require("../db");
const { JWT_SECRET } = require("../config");
const zod = require("zod");
const authMiddleware = require("../middleware");
const router = express.Router();


const signupSchema = zod.object({
    username: zod.string().email({message:"Invalid email"}),
    firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string(),

})

const signinSchema = zod.object({
    username: zod.string().optional(),
    password: zod.string().optional(),
})

const updateBodySchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
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

    body.firstName = body.firstName.toUpperCase();
    body.lastName = body.lastName.toUpperCase();

    // body.firstName = UpperCaseFirstName;
    // body.lastName = UpperLastName;

    const dbUser = await User.create(body);

    const token = jwt.sign({userId:dbUser._id},JWT_SECRET); 

    // Here is the code to randomly generate some balance

    await Account.create({
        userId: dbUser._id,
        balance: Math.floor(Math.random() * 10000)
    })

    res.status(200).json({message: "User created",
        token: token
    });

});

router.post("/signin", async (req,res)=>{

    const body = req.body;

    const {success} = signinSchema.safeParse(body);

    if(!success){
        return res.status(411).json({message: "Error while logging in"});
    }

    const user = await User.findOne({
        username:body.username,
        password:body.password
    });

    if(!user){
        return res.status(411).json({message: "Error while logging in"});
    }

    const token = jwt.sign({userId:user._id},JWT_SECRET);

    return res.status(200).json({
        token: token
    });
    
});

router.put("/",authMiddleware, async (req,res)=>{
    
    const body = req.body;

    const {success} = updateBodySchema.safeParse(body);

    if(!success){
        return res.status(411).json({message: "Error while logging in"});
    }

    await User.updateOne({
        _id: req.userId
    },req.body);

    return res.status(200).json({
        message: "Updated successfully"
    });


});



router.get("/bulk", async (req, res) => {

    const filter = req.query.filter.toUpperCase() || "";

    // The above const filter is used beacause the url we get is like ?filter=harkirat so to get that we are 
    // doing this

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})





module.exports = router;