const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs/dist/bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Please enter valid email");
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("Can't use the word password in your password");
            }
        }
    },
    age: {
        type: Number,
        default: 0
    }
});

// Middleware
// We have used normal function because we reference this to the user
userSchema.pre("save", async function (next) {
    const user = this;

    // It runs when new user created or existing user gets update
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})

const User = mongoose.model("User", userSchema)
module.exports = User;