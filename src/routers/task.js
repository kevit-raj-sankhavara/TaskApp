const express = require("express");
const router = new express.Router();
const Task = require("../models/task");

// Create New Task
router.post("/tasks", async (req, res) => {
    const newTask = new Task(req.body);
    try {
        await newTask.save();
        res.status(201).send(newTask);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Fetch all Tasks
router.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (error) {
        res.status(404).send();
    }
})

// Fetch Task by id
router.get("/tasks/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const task = await Task.findById(id);
        res.send(task);
    } catch (error) {
        res.status(404).send();
    }
})

// Update the Task
router.patch("/tasks/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await Task.findByIdAndUpdate(id, req.body);
        const updatedTask = await Task.findById(id);
        res.send(updatedTask);
    } catch (error) {
        res.status(404).send(error);
    }
})

// Delete the Task
router.delete("/tasks/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task)
            return res.status(404).send();
        res.send(task)
    } catch (error) {
        res.status(500).send();
    }
})

module.exports = router;