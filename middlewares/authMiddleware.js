const jwt = require("jsonwebtoken");
const UserModol = require("../model/user.model");
require("dotenv").config();


const authMiddleware = async (req, res, next) => {
    try {
        let token = req.headers.authorization || "";
        token = token.split(" ")[1];

        // req.cookies // To get cookies from the request
        if(!token){
            return res.status(401).json({
                success: false,
                // message: "Unauthorized: Invalid or missing token",
                message: "Unauthorized: Invalid or missing token",
            });
        }

        /**
         * 1. Validate the token
         * 2. not vaild before
         * 3. not expired
         * 4. Is the user inside the token valid?
         */

        const tokenData = jwt.verify(token, process.env.JWT_KEY);
        // console.log("isValid", tokenData);

        const user = await UserModol.findById(tokenData.id);
        // console.log(user)

        if (!user.isActive) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: "Unauthorized: Invalid or missing token"
                });
        }
        req.user = user;
        next(); // Forward the request to API
    } catch (err) {
        return res
            .status(401)
            .json({
                success: false,
                message: "Unauthorized: Invalid or missing token",
                error: err.message
            });
    }
};

module.exports = authMiddleware;