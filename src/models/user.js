const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
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
})

module.exports = User;