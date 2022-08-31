const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const tasksRouter = require("./routes/tasks.routes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/tasks", tasksRouter);

app.use((error, req, res, next) => {
  return res.json({
    error: error.message,
  });
});

app.listen(3000, () => console.log("Server listening on port 3000"));
