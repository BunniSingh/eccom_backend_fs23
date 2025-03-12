const CartModol = require("../model/cart.model");
const CouponModel = require("../model/coupon.model");
const OrderModel = require("../model/order.model")

const dayjs = require('dayjs');
const Product = require("../model/product.model");
const sendEmail = require("../servives/emailService");

const createOrder = async (req, res, next) =>{
    /**
     * 1. Fetch user cart
     * 2. Total amount
     *  * Check the inventory for order
     * 3. Apply coupon (Total Value)
     * 4. PLACE ORDER
     *  4.1 COD
     *  4.2 ONLINE
     * 5. Insert the order details into orders collection
     * 6. Clear the user cart
     * 7. Reduce the inventory
     * 8. Send order confirmation Email / SMS
     */
    try{
        let userCart = await CartModol.findOne({userId: req.user.id}).populate("products.productId");
        if(!userCart || userCart.products.length === 0){
            return res.status(401).json({
                success: false,
                message: "Please add at least 1 product in your cart to place an order"
            })
        }

        const outOfStock = userCart.products.some(prod => prod.productId.stock < prod.qty)
        if(outOfStock){
            return res.status(400).json({
                success: false,
                message: "Product is out of stock"
            })
        }

        let total = userCart.products.reduce((acc, prod) => (prod.productId.price * prod.qty) + acc, 0);
        
        let discountInRs = 0;
        let finalAmount = total;
        if(req.body.couponCode){
            let coupon = await CouponModel.findOne({code: req.body.couponCode});
            if(!coupon){
                return res.status(400).json({
                    success: false,
                    message: "Coupon is invalid or expired"
                })
            }

            let couponExpireDate = dayjs(coupon.validTill);
            let currenDate = dayjs();
            let isValid = currenDate.isBefore(couponExpireDate);
            if(!isValid){
                return res.status(400).json({
                    success: false,
                    message: "Coupon is invalid or expired"
                })
            }
            
            if(total < coupon.minAmountRequired){
                return res.status(400).json({
                    success: false,
                    message: `Minimum amount required to claim this coupon is Rs ${coupon.minAmountRequired}`
                })
            }

            discountInRs = (total * coupon.discountPercentage) / 100;
            discountInRs = discountInRs > coupon.maxDiscountInRs ? coupon.maxDiscountInRs : discountInRs;
            finalAmount =   (total - discountInRs).toFixed(2);
        }
        
        // console.log(discountInRs, finalAmount);
        if(req.body.paymentMode === "ONLINE"){}

        let orderedProduct = userCart.products.map(prod => ({productId: prod.productId._id, qty: prod.qty}));
        console.log(req.user)

        let orderDetailsObj = {
            paymentMode: req.body.paymentMode,
            shippingAddress: req.body.shippingAddress,
            userId: req.user._id,
            productDetails: orderedProduct,
            totalAmount: total,
            discountAmount: discountInRs,
            finalAmount,
        }
        let orderedData = await OrderModel.create(orderDetailsObj);

        await CartModol.deleteOne({userId: req.user._id});

        orderedProduct.forEach( async (prod) => {
            await Product.findByIdAndUpdate(prod.productId, {
                $inc :{
                    stock: -prod.qty
                }
            })
        })

        res.json({
            success: true,
            message: `Order place successfully with order id ${orderedData._id}`,
        })

        sendEmail({
            toEmail: req.user.email,
            subject: "Order Confirmation!",
            orderDetails: orderDetailsObj
        })

    

    }catch(err){
        return res.status(401).json({
                success: false,
                message: err.message
            })
    }
}

module.exports = {
    createOrder
}


// let obj = {
//     "paymentMode": "ONLINE",
//     "shippingAddress": {
//         "addressLine1": "123 Main Street",
//         "addressLine2": "Apt 4B",
//         "city": "New York",
//         "state": "NY",
//         "pincode": "10001"
//     },  
//     "productDetails": [
//         {
//             "productId": "65e4e123c4a7890d345678ac",
//             "qty": 2
//         },
//         {
//             "productId": "65e4e345c4a7890d345678bd",
//             "qty": 1
//         }
//     ],
//     "totalAmount": 2500,
//     "discountAmount": 200,
//     "paidAmount": 2300,
//     "orderStatus": "IN_PROCESS"
// }