const UserModol = require("../model/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_KEY = "abc_123_xyz"

const userRegister = async (req, res, next) => {
    try{
        // let plainPassword = req.body.password;
        // const salt = await bcrypt.genSalt(10)
        // const cipherTextPassword = await bcrypt.hash(plainPassword, salt);
        await UserModol.create(req.body);
        res.json({
            success: true,
            message: "User register successfully"
        })
    }catch(err){
        next(err)
    }
}


const userLogin = async (req, res, next) =>{
    try{
        const user = await UserModol.findOne({email: req.body.email})
        if(!user){
            res.status(400).json({
                success: false,
                message: "Invalid username"
            })
            return;
        }
        const isPasswordValid = await bcrypt.compare(req.body.password , user.password);
        if(!isPasswordValid){
            res.status(400).json({
                success: false,
                message: "Invalid password"
            })
            return;
        }
        let currentTimeInSec = parseInt(Date.now()/1000);
        let tockenObj = {
            iat: currentTimeInSec,
            exp: currentTimeInSec + 3600,
            id: user._id  
        }
        const token = jwt.sign(tockenObj, JWT_KEY);
        await UserModol.findByIdAndUpdate(user._id, {token});
        res.json({
            success: true,
            message: "User login successfully",
            token,
        })
    }catch(err){
        next(err);
    }
}


const userController = {
    userRegister,
    userLogin
}


module.exports = userController