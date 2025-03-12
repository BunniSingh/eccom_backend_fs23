
const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require('./route/user.route');
const productRouter = require('./route/product.route');
const cartRouter = require('./route/cart.route');
const couponRouter = require('./route/coupon.route');
const authMiddleware = require('./middlewares/authMiddleware');
const orderRouter = require('./route/order.route');

require('dotenv').config();

const app = express();

const port = process.env.port;
const DB_URI = process.env.DB_URI;

//Middlewares
app.use(express.json());
app.use(cors({origin: process.env.ORIGIN_ALLOW}));

//Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", authMiddleware, productRouter);
app.use("/api/v1/cart", authMiddleware, cartRouter);
app.use("/api/v1/coupon", authMiddleware, couponRouter);
app.use("/api/v1/order", authMiddleware, orderRouter);

mongoose
    .connect(DB_URI)
    .then(() => console.log("DB connected successfully"))
    .catch(err => console.log('Error while connecting DB:', err))


app.listen(port, ()=> console.log("Server started on port:", port));
