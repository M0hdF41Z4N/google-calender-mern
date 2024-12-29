// Import necessary modules and middleware
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';


import connectDB from './config/db.js'; // Import the database connection

// Import routes
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';

const app = express();

// Configure middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
  origin: '*', // Allow all domains for simplicity, you can customize this as needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed HTTP headers
  credentials: true, // Allow credentials like cookies and authorization headers
};

app.use(cors(corsOptions));
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
