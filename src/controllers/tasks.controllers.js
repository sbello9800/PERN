const pool = require("../db");

const getAllTask = async (req, res, next) => {
  try {
    const allTasks = await pool.query("SELECT * FROM task");
    res.json(allTasks.rows);
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM task WHERE id = $1", [id]);

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Task not found",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  const { title, descripcion } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO task ( title, descripcion ) VALUES ($1, $2) RETURNING *",
      [title, descripcion]
    );
  } catch (error) {
    //para desarrollo, da info del error
    //res.json(result.rows[0]);
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM task WHERE id = $1", [id]);

    console.log(result);

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Task not found",
      });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, descripcion } = req.body;

    const result = await pool.query(
      "UPDATE task SET title =$1, descripcion = $2 WHERE id =$3 RETURNING *",
      [title, descripcion, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "task not found",
      });

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTask,
  getTask,
  createTask,
  deleteTask,
  updateTask,
};
