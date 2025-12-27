import express, { Request, Response } from "express";
import initDB from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";


const app = express()

// parser
app.use(express.json());
// app.use(express.urlencoded());

// initializing db
initDB();
// "/"-> localhost:5000
app.get('/', logger, (req: Request, res: Response) => {
    res.send('Hello NextLevel Developer!')
})

// Users CRUD 
app.use("/users", userRoutes);

// todos CRUD
app.use('/todos', todoRoutes);

// auth route
app.use('/auth', authRoutes);

// 404 route
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found!",
        path: req.path
    })
})

export default app;