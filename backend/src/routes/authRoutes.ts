import { Router } from "express";
import { register, login, me } from "../controllers/authController";
import {
  createWorkoutPlan,
  viewProgress,
  getWorkoutPlans,
  logSession,
  submitPlanForSharing,
} from "../controllers/workoutController";
import {
  createExerciseTemplate,
  approveSharedPlan,
  getPendingPlans,
} from "../controllers/adminController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, me);
router.post("/workout-plan", authMiddleware, createWorkoutPlan);
router.get("/progress", authMiddleware, viewProgress);
router.get("/workout-plans", authMiddleware, getWorkoutPlans);
router.post("/session", authMiddleware, logSession);
router.post("/exercise-template", authMiddleware, createExerciseTemplate);
router.post("/approve-plan", authMiddleware, approveSharedPlan);
router.get("/pending-plans", authMiddleware, getPendingPlans);
router.post("/workout-plan/submit", authMiddleware, submitPlanForSharing);

export default router;
