const { Router } = require("express");
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controllers");

const tasksRouter = Router();

tasksRouter.get("/", getAllTasks);

tasksRouter.get("/:id", getTask);

tasksRouter.post("/", createTask);

tasksRouter.put("/:id", updateTask);

tasksRouter.delete("/:id", deleteTask);

module.exports = tasksRouter;
