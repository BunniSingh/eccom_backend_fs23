const mongoose = require('mongoose');
const bcrypt = require("bcrypt");


const userSchemaObject = {
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false,
        default: "NA"
    },
    mobileNo: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^\d{10}$/.test(value);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Others"]
    },
    token:{
        type: String,
        required: false,
        default: ""
    },
    userRole: {
        type: String,
        default: "CUSTOMER",
        enum: ["CUSTOMER", "SELLER", "ADMIN", "SUPER_ADMIN"]
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
}

const userSchema = new mongoose.Schema(userSchemaObject, {timestamps: true});
userSchema.pre("save" , async function() {
    try{
        const salt = await bcrypt.genSalt(10);
        const cipharTextPassword = await bcrypt.hash(this.password, salt);
        this.password = cipharTextPassword;
    }catch(err){
        console.log("ERROR while password hashing:", err);
    }
})
const UserModol = mongoose.model("users", userSchema);
module.exports = UserModol;




// const sfd = {
//     "email": "banti@gmail.com",
//     "password": "abc#1231",
//     "firstName": "Banti",
//     "lastName": "Singh",
//     "mobileNo": "9113169140",
//     "gender": "Male"
// }