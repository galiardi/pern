const pool = require("../db");

async function getAllTasks(req, res) {
  try {
    const tasks = await pool.query("select * from task");
    return res.json(tasks.rows);
  } catch (err) {
    console.log(err);
    return res.json({ error: err });
  }
}

async function getTask(req, res) {
  try {
    const id = req.params.id;
    const task = await pool.query("select * from task where task.id = $1", [
      id,
    ]);
    res.json(task.rows);
  } catch (err) {
    console.log(err);
    return res.json({ error: err });
  }
}

async function createTask(req, res) {
  try {
    const result = await pool.query(
      "insert into task (title, description) values($1, $2)",
      [req.body.title, req.body.description]
    );
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.json({ error: err });
  }
}

module.exports = {
  getAllTasks,
  getTask,
  createTask,
};
