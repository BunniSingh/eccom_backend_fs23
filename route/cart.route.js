const express = require("express");
const { addToCart, changeQuentity, getCart } = require("../controller/cart.controller");

const cartRouter = express.Router();

cartRouter.post("/add", addToCart);

cartRouter.post("/change-qty", changeQuentity);

cartRouter.get("/", getCart);
module.exports = cartRouter;