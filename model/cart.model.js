const mongoose = require('mongoose');

const product = {
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "products",
    },
    qty: {
        type: Number,
        required: true,
        default: 1
    },
}
const cartSchema = new mongoose.Schema({
    products: {
        type: [product],
        require: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    }

})

const CartModol = mongoose.model("carts", cartSchema);
module.exports = CartModol;