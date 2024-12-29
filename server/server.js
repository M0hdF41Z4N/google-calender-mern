import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js'; // Import the database connection
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
