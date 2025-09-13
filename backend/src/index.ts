import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import { connectDB } from './db';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api', authRoutes);

const PORT = process.env.PORT || 8000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
