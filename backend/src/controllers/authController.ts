import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, password_confirmation } = req.body;

  if (password !== password_confirmation) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }
  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: 'Password must be at least 8 characters' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password, credits, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, hashedPassword, 50, 'user']
    );
    const user = result.rows[0];
    const token = jwt.sign(
      { id: user.id, role: user.role },
      'e5084a190c3649561c6225651f18c5798510cdf572f0ae0550c4e8968af6a8237629d78114ffde6ea8cd8b3d4c4869a3c05ef4d1f132cf4b19c835293fb10d45',
      { expiresIn: '1h' }
    );
    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        credits: user.credits,
        role: user.role,
      },
    });
  } catch (err: any) {
    if (err.code === '23505') {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      'e5084a190c3649561c6225651f18c5798510cdf572f0ae0550c4e8968af6a8237629d78114ffde6ea8cd8b3d4c4869a3c05ef4d1f132cf4b19c835293fb10d45',
      { expiresIn: '1h' }
    );
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        credits: user.credits,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const me = async (req: Request, res: Response) => {
  const user = (req as any).user;
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    credits: user.credits,
    role: user.role,
  });
};
