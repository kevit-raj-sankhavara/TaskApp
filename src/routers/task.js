const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const auth = require("../middleware/auth");


// Create New Task
router.post("/tasks", auth, async (req, res) => {
    const newTask = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await newTask.save();
        res.status(201).send(newTask);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Fetch all Tasks
router.get("/tasks", auth, async (req, res) => {
    try {
        // const tasks = await Task.find({ owner: req.user._id });
        await req.user.populate("tasks");
        res.send(req.user.tasks);
    } catch (error) {
        res.status(404).send();
    }
})

// Fetch Task by id
router.get("/tasks/:id", auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task)
            res.status(404).send()
        res.send(task);
    } catch (error) {
        res.status(404).send();
    }
})

// Update the Task
router.patch("/tasks/:id", auth, async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description", "completed"];

    const isValidaete = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidaete)
        return res.status(400).send();

    try {
        const task = await Task.findOne({ _id, owner: req.user._id });

        if (!task)
            res.status(404).send();

        updates.forEach((element) => {
            task[element] = req.body[element];
        })
        await task.save();

        res.send({ update: "success", task });
    } catch (error) {
        res.status(404).send(error);
    }
})

// Delete the Task
router.delete("/tasks/:id", auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
        if (!task)
            return res.status(404).send();
        res.send({ delete: "success", task });
    } catch (error) {
        res.status(500).send();
    }
})

module.exports = router;