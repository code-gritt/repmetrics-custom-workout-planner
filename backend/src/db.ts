import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString:
    'postgresql://neondb_owner:npg_2PDuvArpOn6E@ep-raspy-king-adhdgavn-pooler.c-2.us-east-1.aws.neon.tech/repmetrics-database?sslmode=require&channel_binding=require',
});

export async function connectDB() {
  try {
    const client = await pool.connect();
    console.log('Connected to Neon DB');
    client.release();
  } catch (err) {
    console.error('DB connection error:', err);
  }
}

export default pool;
