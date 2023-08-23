const express = require("express");
const router = express.Router();
const FetchUser = require("../Middleware/FetchUser");
const Coupon = require("../models/Coupons");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all the coupons: GET "/api/coupons/fetchallcoupons". Login required
router.get("/fetchallcoupons", FetchUser, async (req, res) => {
    try {
        const coupons = await Coupon.find({ user: req.user.id });
        res.json(coupons);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Add a new coupon: POST "/api/coupons/addcoupon". Login required
router.post("/addcoupon", FetchUser, [
    body("code", "Code Must be atleast 3 characters long").isLength({ min: 3 })
], async (req, res) => {
    try {
        const { code, discount_type, discount, expiry, website } = req.body;
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Create a new coupon
        const coupon = new Coupon({
            code, discount_type, discount, expiry, user: req.user.id, website
        })
        const savedCoupon = await coupon.save();
        res.json(savedCoupon);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 3: Update an existing coupon: PUT "/api/coupons/updatecoupon". Login required
router.put("/updatecoupon/:id", FetchUser, async (req, res) => {
    try {
        const { code, discount_type, discount, expiry, website } = req.body;
        // Create a new coupon
        const newCoupon = {};
        if (code) { newCoupon.code = code };
        if (discount_type) { newCoupon.discount_type = discount_type };
        if (discount) { newCoupon.discount = discount };
        if (expiry) { newCoupon.expiry = expiry };
        if (website) { newCoupon.website = website };
        
        // Find the coupon to be updated and update it
        let coupon = await Coupon.findById(req.params.id);
        if (!coupon) { return res.status(404).send("Not Found") };
        if (coupon.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") };
        coupon = await Coupon.findByIdAndUpdate(req.params.id, { $set: newCoupon }, { new: true });
        res.json({ coupon });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 4: Delete an existing coupon: DELETE "/api/coupons/deletecoupon". Login required
router.delete("/deletecoupon/:id", FetchUser, async (req, res) => {
    try {
        // Find the coupon to be deleted and delete it
        let coupon = await Coupon.findById(req.params.id);
        if (!coupon) { return res.status(404).send("Not Found") };
        if (coupon.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") };
        coupon = await Coupon.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Coupon has been deleted", coupon: coupon });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;