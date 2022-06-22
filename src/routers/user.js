const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");


// Create New User 
router.post("/users", async (req, res) => {
    const newUser = new User(req.body);
    try {
        await newUser.save();
        const token = await newUser.generateAuthToken();
        res.status(201).send({ signup: "success", newUser, token });
    } catch (error) {
        res.status(400).send(error);
    }
})

// User Login
router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ login: "success", user, token });
    } catch (error) {
        res.status(400).send("Invalid credentials");
    }
})

// Fetch User Profile
router.get("/users/me", auth, async (req, res) => {
    res.send(req.user);
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
    const updates = Object.keys(req.body);

    try {
        const user = await User.findById(id);
        updates.forEach((element) => {
            user[element] = req.body[element];
        })
        await user.save();
        res.send(user);
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