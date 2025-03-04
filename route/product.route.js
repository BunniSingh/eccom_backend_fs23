const express = require('express');
const { productCreate, productList } = require('../controller/product.controller');

const productRouter = express.Router();

productRouter.post("/create", productCreate)
productRouter.get("/list", productList)


module.exports = productRouter;