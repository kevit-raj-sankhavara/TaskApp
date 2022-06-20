const express = require('express');
require("./db/mongoose")
const User = require("./models/user");

const app = express();

const port = process.env.PORT || 3000;

// It allow us to use json data from the req body
app.use(express.json());

app.post("/users", (req, res) => {
    res.send(req.body);
    console.log(req.body);
})

app.listen(port, () => {
    console.log("Server is up on port", port);
})