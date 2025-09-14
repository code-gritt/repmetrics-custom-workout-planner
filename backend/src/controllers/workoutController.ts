import { Request, Response } from "express";
import pool from "../db";

export const createWorkoutPlan = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { name, goal, duration_days, exercises } = req.body;

  if (!name || !Array.isArray(exercises)) {
    return res.status(400).json({ error: "Name and exercises are required" });
  }

  if (user.credits < 10) {
    return res.status(403).json({ error: "Insufficient credits" });
  }

  try {
    await pool.query("BEGIN"); // Start transaction

    // Create plan
    const planResult = await pool.query(
      `INSERT INTO workout_plans (user_id, name, goal, duration_days, exercises, is_shared)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [user.id, name, goal, duration_days, JSON.stringify(exercises), false]
    );

    // Deduct credits
    await pool.query("UPDATE users SET credits = credits - 10 WHERE id = $1", [
      user.id,
    ]);

    await pool.query("COMMIT"); // Commit transaction

    res.status(201).json(planResult.rows[0]);
  } catch (err) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error: "Server error" });
  }
};

export const viewProgress = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { plan_id } = req.query;

  try {
    let query = `
      SELECT s.*, wp.name as plan_name
      FROM sessions s
      JOIN workout_plans wp ON s.workout_plan_id = wp.id
      WHERE s.user_id = $1
    `;
    const params = [user.id];

    if (plan_id) {
      query += " AND s.workout_plan_id = $2";
      params.push(Number(plan_id));
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getWorkoutPlans = async (req: Request, res: Response) => {
  const user = (req as any).user;
  try {
    const result = await pool.query(
      "SELECT * FROM workout_plans WHERE user_id = $1",
      [user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const logSession = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { workout_plan_id, completed_exercises, session_date } = req.body;

  if (
    !workout_plan_id ||
    !Array.isArray(completed_exercises) ||
    !session_date
  ) {
    return res
      .status(400)
      .json({ error: "Plan ID, exercises, and session date required" });
  }

  if (user.credits < 5) {
    return res.status(403).json({ error: "Insufficient credits" });
  }

  try {
    await pool.query("BEGIN");

    // Verify plan belongs to user
    const planResult = await pool.query(
      "SELECT * FROM workout_plans WHERE id = $1 AND user_id = $2",
      [workout_plan_id, user.id]
    );
    if (!planResult.rows[0]) {
      await pool.query("ROLLBACK");
      return res.status(404).json({ error: "Plan not found" });
    }

    // Log session
    const sessionResult = await pool.query(
      `INSERT INTO sessions (user_id, workout_plan_id, completed_exercises, session_date)
         VALUES ($1, $2, $3, $4) RETURNING *`,
      [
        user.id,
        workout_plan_id,
        JSON.stringify(completed_exercises),
        session_date,
      ]
    );

    // Deduct credits
    await pool.query("UPDATE users SET credits = credits - 5 WHERE id = $1", [
      user.id,
    ]);

    await pool.query("COMMIT");
    res.status(201).json(sessionResult.rows[0]);
  } catch (err) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error: "Server error" });
  }
};

export const submitPlanForSharing = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { plan_id } = req.body;

  if (!plan_id) {
    return res.status(400).json({ error: "Plan ID required" });
  }

  try {
    const result = await pool.query(
      "UPDATE workout_plans SET pending_approval = TRUE WHERE id = $1 AND user_id = $2 RETURNING *",
      [plan_id, user.id]
    );
    if (!result.rows[0]) {
      return res.status(404).json({ error: "Plan not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
