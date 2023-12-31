const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    website:{
        type: String,
        required: true
    },
    code:{
        type: String,
        required: true
    },
    discount_type:{
        type: String,
        required: true
    },
    discount:{
        type: Number,
        required: true
    },
    expiry:{
        type: Date,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('coupon', CouponSchema);