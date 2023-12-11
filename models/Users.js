const mongoose = require("mongoose");
const { model } = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const hash = bcrypt.hash;
const jwt = require("jsonwebtoken");
const sign = jwt.sign;

const UserSchema = new  Schema({
    avatar: { type: String, default: "" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verificationCode: { type: String, required: false },
    admin: { type: Boolean, default: false },
}, 
    {timestamps: true}
);

UserSchema.pre("save", async function(next) {
    if(this.isModified("password")){
        this.password = await hash(this.password, 10)
        return next()
    }
    return next()
})

UserSchema.methods.generateJWT = async function() {
    return await sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: "30d"} )
} 

const User = model("User", UserSchema);
module.exports = User;