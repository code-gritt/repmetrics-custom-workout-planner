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
