import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import authRoutes from './routes/authRoutes';
import pool, { connectDB } from './db';

dotenv.config();
const app = express();

// CORS config
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      'https://repmetrics.vercel.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use(express.json());
app.use(passport.initialize());

// Passport Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID:
        '606422894145-5ugkmdbjd9b66pgq711ln8hmcl6fhdlo.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) return done(new Error('No email found'));

        // Find user in DB
        let result = await pool.query('SELECT * FROM users WHERE email = $1', [
          email,
        ]);
        let user = result.rows[0];

        // If user does not exist, create one
        if (!user) {
          result = await pool.query(
            'INSERT INTO users (name, email, password, credits, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [profile.displayName, email, '', 50, 'user']
          );
          user = result.rows[0];
        }

        // Generate JWT
        const token = jwt.sign(
          { id: user.id, role: user.role },
          'e5084a190c3649561c6225651f18c5798510cdf572f0ae0550c4e8968af6a8237629d78114ffde6ea8cd8b3d4c4869a3c05ef4d1f132cf4b19c835293fb10d45',
          { expiresIn: '1h' }
        );

        return done(null, { user, token });
      } catch (err) {
        return done(err as Error);
      }
    }
  )
);

// Google OAuth routes
app.get(
  '/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req: any, res) => {
    const { token } = req.user;
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  }
);

// Normal auth routes
app.use('/api', authRoutes);

const PORT = process.env.PORT || 8000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
