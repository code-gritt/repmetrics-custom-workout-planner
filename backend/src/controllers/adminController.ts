import { Request, Response } from "express";
import pool from "../db";

export const createExerciseTemplate = async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }

  const { name, category, description, video_url } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  if (user.credits < 20) {
    return res.status(403).json({ error: "Insufficient credits" });
  }

  try {
    await pool.query("BEGIN");
    const result = await pool.query(
      `INSERT INTO exercise_templates (name, category, description, video_url)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, category, description, video_url]
    );
    await pool.query("UPDATE users SET credits = credits - 20 WHERE id = $1", [
      user.id,
    ]);
    await pool.query("COMMIT");
    res.status(201).json(result.rows[0]);
  } catch (err) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error: "Server error" });
  }
};

export const approveSharedPlan = async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }

  const { plan_id, approve } = req.body;
  if (!plan_id) {
    return res.status(400).json({ error: "Plan ID required" });
  }

  try {
    const result = await pool.query(
      `UPDATE workout_plans
       SET is_shared = $1, pending_approval = FALSE
       WHERE id = $2 AND pending_approval = TRUE
       RETURNING *`,
      [approve, plan_id]
    );
    if (!result.rows[0]) {
      return res.status(404).json({ error: "Pending plan not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getPendingPlans = async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM workout_plans WHERE pending_approval = TRUE"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
