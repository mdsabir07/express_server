import express from "express";
import { authControllers } from "./auth.controller";

const router = express.Router();

// http://localhost:5000/auth/login
router.post("/login", authControllers.loginUser);

export const authRoutes = router;