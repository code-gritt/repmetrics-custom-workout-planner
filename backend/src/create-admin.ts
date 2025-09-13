import bcrypt from 'bcrypt';
import pool from './db';

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await pool.query(
      'INSERT INTO users (name, email, password, credits, role) VALUES ($1, $2, $3, $4, $5)',
      ['Admin', 'admin@example.com', hashedPassword, 50, 'admin']
    );
    console.log('Admin user created');
  } catch (err) {
    console.error('Error creating admin:', err);
  } finally {
    await pool.end();
  }
}

createAdmin();
