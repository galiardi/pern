const { Router } = require("express");
const {
  getAllTasks,
  createTask,
  getTask,
} = require("../controllers/tasks.controllers");

const tasksRouter = Router();

tasksRouter.get("/", getAllTasks);

tasksRouter.get("/:id", getTask);

tasksRouter.post("/", createTask);

tasksRouter.put("/", (req, res) => {});

tasksRouter.delete("/", (req, res) => {});

module.exports = tasksRouter;
