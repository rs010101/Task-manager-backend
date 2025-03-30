import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes); // User routes
app.use('/api', taskRoutes); // Task routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});