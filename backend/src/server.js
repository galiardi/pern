const express = require("express");
const morgan = require("morgan");

const tasksRouter = require("./routes/tasks.routes");

const app = express();

app.use(morgan("dev"));

app.use("/tasks", tasksRouter);

app.listen(3000, () => console.log("Server listening on port 3000"));
