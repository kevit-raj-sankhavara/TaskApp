const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", () => {
    console.log("Connected");
})

// Create Model
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
        // Write validation code in this function
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

// Create User as per Model
// const newUser = new User({
//     name: "  Het",
//     email: "    Hello455@email.com",
//     age: 10,
//     password: "Password123"
// })

// // Saving the newUser to Database
// newUser.save().then(user => console.log(user))
//     .catch(err => console.log(err));


// Task Model
const Task = mongoose.model("Task", {
    description: {
        type: String,
        required: true,
        unique: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const newTask = new Task({
    description: "Task10",
    completed: true
})

newTask.save().then(task => console.log(task))
    .catch(err => console.log(err))