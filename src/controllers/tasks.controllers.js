const pool = require("../db");

const getAllTask = async (req, res) => {
  try {
    const allTasks = await pool.query("SELECT * FROM task");
    res.json(allTasks.rows);
  } catch (error) {
    console.log(error.message);
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM task WHERE id = $1", [id]);

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Task not found",
      });
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
};

const createTask = async (req, res) => {
  const { title, descripcion } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO task ( title, descripcion ) VALUES ($1, $2) RETURNING *",
      [title, descripcion]
    );

    res.json(result.rows[0]);
  } catch (error) {
    //para desarrollo, da info del error
    res.json({ error: error.message });
  }
  //res.send("Creating a task");
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query("DELETE FROM task WHERE id = $1", [id]);

  console.log(result);

  if (result.rowCount === 0)
    return res.status(404).json({
      message: "Task not found",
    });

  return res.sendStatus(204);
};

const updateTask = (req, res) => {
  res.send("Updating a task");
};

module.exports = {
  getAllTask,
  getTask,
  createTask,
  deleteTask,
  updateTask,
};
