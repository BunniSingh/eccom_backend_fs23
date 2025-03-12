const Product = require("../model/product.model");
const UserModol = require("../model/user.model");

const productCreate = async (req, res, next) =>{
    try{
        await Product.create(req.body);
        res.json({
            success: true,
            message: "Product create API"
        })
    }catch(err){
        return res.status(400).json({
            success: false,
            message: err.message    
        })
    }
}
const productList = async (req, res, next) =>{
    try{    
        // let token = req.headers.Authorization || "";
        
        // if(!token){
        //     return res.status(401).json({
        //         success: false,
        //         message: "Unauthorized: Invalid or missing token",
        //     });
        // }

        let pageNo = parseInt(req.query.pageNo) || 1;
        let itemPerPage = parseInt(req.query.itemPerPage) || 10;
        let search = req.query.search;
        let searchQuery = {
            $or: [
                {
                    title: new RegExp(search, "gi")
                },
                {
                    description: new RegExp(search, "gi")
                },
                {
                    tags:{
                        $in: [search]
                    }
                },
            ]
        }
        let totalProducts = await Product.find(searchQuery).countDocuments();
        let skipPage = (pageNo - 1) * 10;
        let productList = await Product
            .find(searchQuery, {
                title: 1,
                price: 1,
                thumbnail: 1,
            })
            .skip(skipPage)
            .limit(itemPerPage)

        res.json({
            success: true,
            message: "Product list API",
            total: totalProducts,
            data: productList
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const productReview = async (req, res, next) =>{
    try{
        let userData = await UserModol.findById(req.user._id);
        let obj = {
            ...req.body.review,
            reviewerName:`${userData.firstName} ${userData.lastName}`,
            reviewerEmail: userData.email
        }
        let updatedResponce = await Product.findByIdAndUpdate(req.body.productId,{
            $push: {
                reviews: obj
            }
        })
        // if(updatedResponce.modifiedCount === 0){}
        res.json({
            success: true,
            message: "Product review API"
        })
    }catch(err){
        return res.status(400).json({
            success: false,
            message: "API Fail",
            error: err.message    
        })
    }
}

const productDetail = async (req, res, next) => {
    try{

        let id = req.params.id;
        let product = await Product.findById(id);
        if(!product){
            return res
                .status(400)
                .json({
                    success: false,
                    message: "NO product found",
                    data: []
                })
        }
        res.json({
            success: true,
            message: "Product sent successfully",
            data: product
        })

    }catch(err){
        // next(err)
        return res.json({
            success: false,
            message: err.message,
            data: []
        })
    }
}

module.exports = {
    productCreate,
    productList,
    productDetail,
    productReview
}