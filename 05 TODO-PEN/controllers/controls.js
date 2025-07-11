import { pool } from '../db.js';

export const getAllTODO = async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
        
    } catch (error) {
        console.log(error.message); 
    }
}

export const addTODO = async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
          "INSERT INTO todo (description) VALUES($1) RETURNING *",
          [description]
        );
    
        res.json(newTodo.rows[0]);
    } catch (error) {
    console.error(err.message);
    }
}

export const updateTODO = async(req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
          "UPDATE todo SET description = $1 WHERE todo_id = $2",
          [description, id]
        );
    
        res.json("Todo was updated!");
      } catch (err) {
        console.error(err.message);
      }
}

export const deleteTODO = async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
          id
        ]);
        res.json("Todo was deleted!");
      } catch (err) {
        console.log(err.message);
      }
}

export const getATODO = async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
        id
      ]);
  
      res.json(todo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  }