import { Request, Response } from "express";
import { todoServices } from "./todo.service";

// Create todo
const createTodo = async (req: Request, res: Response) => {
    try {
        const result = await todoServices.createTodo(req.body);
        res.status(201).json({
            success: true,
            message: "Todo created successfully",
            data: result.rows[0]
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// get todo
const getTodo = async (req: Request, res: Response) => {
    try {
        const result = await todoServices.getTodo();
        res.status(200).json({
            success: true,
            message: "Todos data retrieved successfully",
            data: result.rows
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            details: error
        })
    }
};

// get single todo
const getSingleTodo = async (req: Request, res: Response) => {
    try {
        const result = await todoServices.getSingleTodo(req.params.id as string);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Todo not found!"
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Todo fetched successfully",
                data: result.rows[0]
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

// update todo
const updateTodo = async (req: Request, res: Response) => {
    const { title, completed, description } = req.body;
    try {
        const result = await todoServices.updateTodo(title, completed, description, req.params.id!);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Todo not found!"
            });
        } else {
            res.status(201).json({
                success: true,
                message: "Todo updated successfully",
                data: result.rows[0]
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

// delete todo
const deleteTodo = async (req: Request, res: Response) => {
    try {
        const result = await todoServices.deleteTodo(req.params.id!);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Todo deleted successfully",
                data: result.rows
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const todoControllers = {
    createTodo,
    getTodo,
    getSingleTodo,
    updateTodo,
    deleteTodo
}