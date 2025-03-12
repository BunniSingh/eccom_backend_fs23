const CouponModel = require("../model/coupon.model")


const createCoupon = async (req, res, next) => {
    try{
        await CouponModel.create(req.body);
        res.json({
            success: true,
            message: "Coupon created successfully"
        })
    }catch(err){
        return res.json({
                success: false,
                message: err.message
            })
    }
}
const getCoupon = async (req, res, next) => {
    try{
        const coupon = await CouponModel.findOne({code:req.body.code});
        if(!coupon){
            return res.json({
                success: false,
                message: "Coupon not found"
            }) 
        }
        res.json({
            success: true,
            message: "Get coupon API",
            result: coupon
        })
    }catch(err){
        return res.json({
                success: false,
                message: err.message
            })
    }
}

module.exports = {
    createCoupon,
    getCoupon
}