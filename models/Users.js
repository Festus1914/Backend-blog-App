const { Schema, model } = require("mongoose");
const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const UserSchema = new Schema(
  {
    avatar: { type: String, default: "" },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Added unique constraint for email
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verificationCode: { type: String, required: false },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await hash(this.password, 10);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.generateJWT = async function () {
  try {
    return await sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  } catch (error) {
    throw error;
  }
};

UserSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    return await compare(enteredPassword, this.password);
  } catch (error) {
    throw error;
  }
};

const User = model("User", UserSchema); // Changed model name to singular "User"
module.exports = User;
