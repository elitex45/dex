require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto")
const router = express.Router();

router.post("/orders", async (req, res) => {
    try {
        const amount = req.body.amount;

        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = {
            amount: amount, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(200).json({ error: "Some error occured while creating an order" });

        res.json(order);

    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/success", async (req, res) => {
    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;


        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
        const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);

        shasum.update(orderCreationId + "|" + razorpayPaymentId);

        const digest = shasum.digest("hex");
        // comaparing our digest with the actual signature
        console.log(digest, razorpaySignature)
        if (digest != razorpaySignature)
            return res.status(200).json({ msg: "Transaction not legit!" });

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

        res.json({
            msg: "Transaction is Successful",
            digest: digest,
            razorpaySignature: razorpaySignature,
        });

    } catch (error) {
        res.status(500).json({ "error": "Error " + error });
    }
});

module.exports = router;