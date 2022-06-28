const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Task = require("../../src/models/task");
const User = require("../../src/models/user");

const id = new mongoose.Types.ObjectId();
const newUser = {
    _id: id,
    name: "New User",
    email: "myemail@gmail.com",
    password: "mypass1234",
    tokens: [{
        token: jwt.sign({ id }, process.env.JWT_SECRET)
    }]
}

const id2 = new mongoose.Types.ObjectId();
const newUser2 = {
    _id: id2,
    name: "New User 2",
    email: "myemail2@gmail.com",
    password: "mypass1234",
    tokens: [{
        token: jwt.sign({ id: id2 }, process.env.JWT_SECRET)
    }]
}

const task1 = {
    _id: new mongoose.Types.ObjectId(),
    description: "First Task",
    completed: false,
    owner: id
}

const task2 = {
    _id: new mongoose.Types.ObjectId(),
    description: "Second Task",
    completed: true,
    owner: id2
}


const setupDB = async () => {
    await User.deleteMany();
    await Task.deleteMany();
    await new User(newUser).save();
    await new User(newUser2).save();
    await new Task(task1).save();
    await new Task(task2).save();
}

module.exports = {
    id, id2, newUser, newUser2, task1, task2, setupDB
}