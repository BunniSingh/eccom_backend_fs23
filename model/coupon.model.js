const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    discountPercentage: {
        type: Number,
        required: true,
    },
    maxDiscountInRs: {
        type: Number,
        required: true,
    },
    minAmountRequired: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    validTill: {
        type: Date,
        required: true,
        // default: new Date()
    },
    maxUseTime: {
        type: Number,
        required: true,
        default: 1
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
},
{
    timestamps: true
})

const CouponModel = mongoose.model("coupons", couponSchema);
module.exports = CouponModel;