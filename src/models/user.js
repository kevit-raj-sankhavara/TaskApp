const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./task");


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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

// Connection between User and Task
userSchema.virtual("tasks", {
    ref: "Task",
    localField: "_id",
    foreignField: "owner"
})

// This method is for Whole User collection
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user)
        throw new Error("Invalid Credentials");

    const authorized = await bcrypt.compare(password, user.password);

    if (!authorized)
        throw new Error("Invalid Credentials");

    return user;
}

// This method is for particular user
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ id: user._id.toString() }, "thisismysecret");
    user.tokens = user.tokens.concat({ token });
    user.save();
    return token;
}

// Will not send password, tokens (toJSON is used to return only selected data witout calling)
userSchema.methods.toJSON = function () {
    const user = this
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.tokens;

    return userObj;
}

// Middleware
// We have used normal function because we reference this to the user
userSchema.pre("save", async function (next) {
    const user = this;

    // It runs when new user is created or existing user gets update
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})

// Delete all tasks of that user when we delete the user
userSchema.pre("remove", async function (next) {
    const user = this;
    await Task.deleteMany({ owner: user._id });
    next();
})

const User = mongoose.model("User", userSchema)
module.exports = User;