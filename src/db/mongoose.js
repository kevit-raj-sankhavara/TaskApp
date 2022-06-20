const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", () => {
    console.log("Connected");
})

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
