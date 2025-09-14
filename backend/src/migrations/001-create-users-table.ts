import pool from "../db";

async function createWorkoutTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS workout_plans (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        goal VARCHAR(100),
        duration_days INTEGER,
        exercises JSONB,
        is_shared BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS sessions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        workout_plan_id INTEGER REFERENCES workout_plans(id) ON DELETE CASCADE,
        completed_exercises JSONB,
        session_date TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Workout tables created");
  } catch (err) {
    console.error("Error creating workout tables:", err);
  } finally {
    pool.end();
  }
}

createWorkoutTables();
