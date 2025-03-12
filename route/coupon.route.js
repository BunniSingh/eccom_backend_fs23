const express = require("express");
const { createCoupon, getCoupon } = require("../controller/coupon.controller");

const couponRouter = express.Router();


couponRouter.post("/create", createCoupon);
couponRouter.get("/get", getCoupon);


module.exports = couponRouter;