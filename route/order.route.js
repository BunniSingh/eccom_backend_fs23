const express = require("express");
const { createOrder } = require("../controller/order.controller");

const orderRouter = express.Router();

orderRouter.post("/create", createOrder);

module.exports = orderRouter;