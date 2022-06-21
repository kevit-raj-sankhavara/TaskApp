const express = require('express');
require("./db/mongoose")
const User = require("./models/user");
const Task = require('./models/task');

const app = express();

const port = process.env.PORT || 3000;

// It allow us to use json data from the req body
app.use(express.json());


// Create New User 
app.post("/users", (req, res) => {
    const newUser = new User(req.body);

    newUser.save(req.body).then(user => res.status(201).send(user))
        .catch(err => res.status(400).send(err));
})

// Create New Task
app.post("/tasks", (req, res) => {
    const newTask = new Task(req.body);

    newTask.save().then(task => res.status(201).send(task))
        .catch(err => res.status(400).send(err));
})

// Fetch all Users
app.get("/users", (req, res) => {
    User.find({}).then(users => res.status(200).send(users))
        .catch(err => res.status(500).send(err))
})

// Fetch User by id (:id => dynamic id)
// We will get this id from req.params object
app.get("/users/:id", (req, res) => {
    const id = req.params.id;

    User.findById(id).then((user) => {
        res.status(200).send(user)
    }).catch(err => res.status(404).send(err))
})

// Fetch all Tasks
app.get("/tasks", (req, res) => {
    Task.find({}).then(tasks => res.status(200).send(tasks))
        .catch(err => res.status(500).send(err))
})

// Fetch Task by id
app.get("/tasks/:id", (req, res) => {
    const id = req.params.id;

    Task.findById(id).then((task) => {
        res.status(200).send(task)
    }).catch(err => res.status(404).send(err))
})



app.listen(port, () => {
    console.log("Server is up on port", port);
})