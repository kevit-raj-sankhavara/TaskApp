require("../src/db/mongoose");
const User = require("../src/models/user");
const Task = require("../src/models/task");

const id = "62b1776d39e0a29af5af068f";

// *User
// User.findByIdAndUpdate(id, { age: 21 })
//     .then((user) => {
//         console.log(user);
//         return User.countDocuments({ age: 21 })
//     }).then(count => console.log("Total user with age 21 : ", count))
//     .catch(err => console.log(err))

// *Task
// Task.findByIdAndDelete(id)
//     .then((task) => {
//         console.log(task);
//         return Task.countDocuments({ completed: false })
//     }).then(count => console.log("Incomplete Tasks :", count))
//     .catch(err => console.log(err))



// *Using async-await

// *User
// const updateUserAndCount = async (id, age) => {
//     const user = await User.findByIdAndUpdate(id, { age });
//     console.log(user);
//     const count = await User.countDocuments({ age });
//     console.log(count);
// }

// updateUserAndCount(id, 21).catch(e => console.log(e))

// *Task
const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    console.log(task);
    const count = await Task.countDocuments({ completed: false });
    console.log(count);
}

deleteTaskAndCount(id).catch(e => console.log(e));