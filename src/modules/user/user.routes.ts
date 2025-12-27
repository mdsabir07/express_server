import express from "express";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";
import logger from "../../middleware/logger";


const router = express.Router();

// app.use("/users", userRoutes)
// routes -> controller -> service
router.post("/", userControllers.createUser);
// get user
router.get("/", logger, auth("admin"), userControllers.getUser);
// get single user
router.get("/:id", auth("admin", "user"), userControllers.getSingleUser);
// update user
router.put("/:id", userControllers.updateUser);
// delete user
router.delete("/:id", userControllers.deleteUser);

export const userRoutes = router;