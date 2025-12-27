import { pool } from "../../config/db";

// create todo
const createTodo = async (payload: Record<string, unknown>) => {
    const { user_id, title } = payload;
    const result = await pool.query(`INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`, [user_id, title ]);
    return result;
}

// get todo 
const getTodo = async () => {
    const result = await pool.query(`SELECT * FROM todos`);
    return result;
}

// get single todo
const getSingleTodo = async (id: string) => {
    const result = await pool.query(`SELECT * FROM todos WHERE id=$1`, [id]);
    return result;
}

// update todo
const updateTodo = async (title: string, completed: boolean, description: string, id: string) => {
    const result = await pool.query(`UPDATE todos SET title=$1, completed=$2, description=$3 WHERE id=$4 RETURNING *`, [title, completed, description, id]);
    return result;
}

// Delete todo
const deleteTodo = async (id: string) => {
    const result = await pool.query(`DELETE FROM todos WHERE id=$1 RETURNING *`, [id]);
    return result;
}

export const todoServices = {
    createTodo,
    getTodo,
    getSingleTodo,
    updateTodo,
    deleteTodo
}