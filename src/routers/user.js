const express = require("express");
const router = new express.Router();
const User = require("../models/user");

// Create New User 
router.post("/users", async (req, res) => {
    const newUser = new User(req.body);
    try {
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Fetch all Users
router.get("/users", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(404).send(error);
    }
})

// Fetch User by id (:id => dynamic id)
// We will get this id from req.params object
router.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        res.send(user);
    } catch (error) {
        res.status(404).send();
    }
})

// Update the User
router.patch("/users/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        const updatedUser = await User.findById(id);
        res.send(updatedUser);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Delete the User
router.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user)
            return res.status(404).send();
        res.send(user)
    } catch (error) {
        res.status(500).send();
    }
})

module.exports = router;