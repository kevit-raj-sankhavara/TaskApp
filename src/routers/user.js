const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
const multer = require("multer");
const sharp = require("sharp");



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

// User Logout
router.post("/users/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(elem => elem.token !== req.token)
        await req.user.save();
        res.send({ logout: "success", token: req.token });
    } catch (error) {
        res.status(500).send();
    }
})

router.post("/users/logoutAll", auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send("All tokens deleted");
    } catch (error) {
        res.status(500).send();
    }
})

// Fetch User Profile
router.get("/users/me", auth, async (req, res) => {
    res.send(req.user);
})

// Update the User
router.patch("/users/me", auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdates = ["name", "email", "password", "age"];
    const isValid = updates.every((element) => allowUpdates.includes(element));

    if (!isValid)
        return res.status(400);


    try {
        updates.forEach((element) => {
            req.user[element] = req.body[element];
        })
        await req.user.save();
        res.send(req.user);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Delete the User
router.delete("/users/me", auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send({ delete: "success", user: req.user });
    } catch (error) {
        res.status(500).send();
    }
})

// Using multer as a middleware
const upload = multer({
    limits: {
        // Size in bytes
        fileSize: 3000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/.(jpg|jpeg|png)$/))
            cb(new Error("Please upload .jpg/.jpeg/.png file"));

        cb(undefined, true);
    }
})

// Uploading Avatar
router.post("/users/me/avatar", auth, upload.single("avatar"), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 500, height: 300 }).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
})

// Delete Avatar
router.delete("/users/me/avatar", auth, async (req, res) => {
    try {
        req.user.avatar = undefined;
        await req.user.save();
        res.send("Avatar deleted");
    } catch (error) {
        res.send(error)
    }
})

// Getting User avatar by ID
router.get("/users/:id/avatar", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || !user.avatar)
            throw new Error();

        res.set("Content-Type", "image/jpg");
        res.send(user.avatar);
    } catch (error) {
        res.status(404).send();
    }
})

module.exports = router;