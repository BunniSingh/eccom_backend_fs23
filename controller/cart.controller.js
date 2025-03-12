const CartModol = require("../model/cart.model")

const addToCart = async (req, res, next) => {
    try{
        const userFromDB = await CartModol.findOne({"userId": req.user._id})
        if(userFromDB){
            await CartModol.findByIdAndUpdate(userFromDB._id, {
                $push: {
                    products: {
                        productId: req.body.products[0].productId,
                        qty: req.body.products[0].qty,
                    }
                }
            })
        }else{
            await CartModol.create({
                ...req.body,
                userId: req.user._id
            });
        }
        res.json({
            success: true,
            message: "Add to cart API"
        })
    }catch(err){
        return res
            .status(400)
            .json({
                success: false,
                message: err.message
            })
    }
}


const changeQuentity = async (req, res, next) => {
    // console.log(req.body.products[0].productId, req.body.products[0].qty)
    try{
        const updateQty = await CartModol.updateOne(
            {
                userId: req.user._id,
                "products.productId": req.body.products[0].productId
            },
            {
                $inc: {
                    "products.$[elem].qty": req.body.products[0].qty
                }
            },
            {
                arrayFilters: [{ "elem.productId": req.body.products[0].productId }]
            }
        );
        if(updateQty.modifiedCount == 0){
            return res.status(400).json({
                success: false,
                message: "Product not found in cart"
            })
        }
        res.json({
            success: true,
            message: "Qty update successfully"
        })
    }catch(err){
        return res.status(400).json({
            success: false,
            message: "Change qty API"
        })
    }
}


const getCart = async (req, res, next) => {
    try{
        let cartList = await CartModol.findOne({userId: req.user._id}).populate("products.productId")
        if(!cartList){
            return res.status(400).json({
                success: false,
                message: "Cart not found",
                results: []
            })
        }
        res.json({
            success: true,
            message: "Get cart API",
            results: cartList
        })
    }catch(err){
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = {
    addToCart,
    changeQuentity,
    getCart
}