const pool = require("../db");

async function getAllTasks(req, res) {
  try {
    const allTasks = await pool.query("select * from task");
    return res.json(allTasks.rows);
  } catch (error) {
    return res.json({ error: error, message });
  }
}

async function getTask(req, res) {
  try {
    const { id } = req.params;
    const task = await pool.query("select * from task where task.id = $1", [
      id,
    ]);
    if (task.rows.length === 0)
      return res.status(400).json({ messge: "Task not found" });
    return res.json(task.rows[0]);
  } catch (error) {
    return res.json({ error: error.message });
  }
}

async function createTask(req, res) {
  try {
    const { title, description } = req.body;
    const result = await pool.query(
      "insert into task (title, description) values($1, $2) returning *",
      [title, description]
    );
    return res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message });
  }
}

/*
// updates only the properties posted in the body
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
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
  }
}
*/

// updates all properties
async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const result = await pool.query(
      "update task set title = $1, description = $2 where id = $3 returning *",
      [title, description, id]
    );
    if (result.rows.length === 0)
      return res.json({ message: "Task not found" });
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
}

async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query("delete from task where id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.json({ error: error.message });
  }
}

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
