import pool from "../db";

async function runMigrations() {
  try {
    // 1. Create users table (if not already created)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        credits INT DEFAULT 0,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Users table created");

    // 2. Create workout tables
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

    // 3. Create exercise templates table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS exercise_templates (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        description TEXT,
        video_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Exercise templates table created");

    // 4. Add pending_approval column
    await pool.query(`
      ALTER TABLE workout_plans
      ADD COLUMN IF NOT EXISTS pending_approval BOOLEAN DEFAULT FALSE;
    `);
    console.log("Pending approval column added");

    console.log("All migrations completed successfully!");
  } catch (err) {
    console.error("Migration error:", err);
  } finally {
    await pool.end(); // <--- call end only once
  }
}

runMigrations();
