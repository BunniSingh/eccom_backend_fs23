const express = require('express');
const { productCreate, productList, productDetail, productReview } = require('../controller/product.controller');
const userRoleMiddleware = require('../middlewares/userRoleMiddleware');

const productRouter = express.Router();

productRouter.post("/create", userRoleMiddleware("SELLER", "ADMIN", "SUPER_ADMIN"), productCreate)
productRouter.get("/list", productList)
productRouter.get("/review", userRoleMiddleware("CUSTOMER"), productReview);

productRouter.get("/:id", productDetail)

module.exports = productRouter;