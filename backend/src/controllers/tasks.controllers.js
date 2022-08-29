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

async function updateTask(req, res) {
  try {
    const id = req.params.id;
    const propsToUpdate = Object.keys(req.body);
    const queryPromises = propsToUpdate.map((prop) => {
      return pool.query(`update task set ${prop} = $1 where id = $2`, [
        req.body[prop],
        id,
      ]);
    });
    const queryResults = await Promise.allSettled(queryPromises);
    console.log(queryResults);
    return res.json(queryResults);
  } catch (err) {
    console.log(err);
    return res.json({ error: err });
  }
}

async function deleteTask(req, res) {
  const id = req.params.id;
  const result = await pool.query("delete from task where id = $1", [id]);
  return res.json(result);
}

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
