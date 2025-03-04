
const express = require('express');
const mongoose = require("mongoose");
const userRouter = require('./route/user.route');
const productRouter = require('./route/product.route');


const app = express();
const port = 5100;
const DB_URI = "mongodb://127.0.0.1:27017/e-commerce";

app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);

mongoose
    .connect(DB_URI)
    .then(() => console.log("DB connected successfully"))
    .catch(err => console.log('Error while connecting DB:', err))


app.listen(port, ()=> console.log("Server started on port:", port));
