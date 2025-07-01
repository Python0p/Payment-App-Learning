const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const { Account } = require("../db");
const authMiddleware = require("../middleware");

const zod = require("zod")


// const transferSchema = zod.object({
//     amount: zod.string(),
//     to: zod.string()
// });

const transferSchema = zod.object({
    amount: zod
        .string()
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val) && val > 0, {
            message: "Amount must be a valid positive number"
        }).pipe(zod.number().positive()),
    to: zod.string()
});


router.get("/balance", authMiddleware, async (req,res)=>{

    const userid = req.userId;

    const user = await Account.findOne({
        userId: userid
    })

    return res.status(200).json({
        balance: user.balance,
        firstName: user.firstName
    });

})


router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    const { success } = transferSchema.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Please type numbers"
        });
    }

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});

module.exports = router;