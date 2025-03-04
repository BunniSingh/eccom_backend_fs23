
const productCreate = (req, res, next) =>{
    res.json({
        success: true,
        message: "Product create API"
    })
}
const productList = (req, res, next) =>{
    res.json({
        success: true,
        message: "Product list API"
    })
}

module.exports = {
    productCreate,
    productList
}