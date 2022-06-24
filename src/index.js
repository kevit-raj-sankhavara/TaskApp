const express = require('express');
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
require('dotenv').config();
require("../src/db/mongoose")

const app = express();

const port = process.env.PORT;

// It allow us to use json data from the req body
app.use(express.json());

app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
    console.log("Server is up on port", port);
})

