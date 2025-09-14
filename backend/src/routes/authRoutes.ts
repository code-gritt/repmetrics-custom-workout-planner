import { Router } from "express";
import { register, login, me } from "../controllers/authController";
import {
  createWorkoutPlan,
  viewProgress,
} from "../controllers/workoutController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, me);
router.post("/workout-plan", authMiddleware, createWorkoutPlan);
router.get("/progress", authMiddleware, viewProgress);

export default router;
