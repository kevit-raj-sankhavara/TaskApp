const mongoose = require("mongoose");

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

module.exports = Task;
