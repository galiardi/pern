const { Router } = require("express");
const pool = require("../db");

const tasksRouter = Router();

tasksRouter.get("/", async (req, res) => {
  const result = await pool.query("select now()");
  console.log(result);
  res.json(result.rows[0].now);
});

tasksRouter.post("/", (req, res) => {});

tasksRouter.put("/", (req, res) => {});

tasksRouter.delete("/", (req, res) => {});

module.exports = tasksRouter;
