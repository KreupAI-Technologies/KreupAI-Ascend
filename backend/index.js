import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// Importing the routes
import incidentRoutes from './routes/incidentsRoutes.js';
import slaRoutes from './routes/slaRoutes.js';
import escalationRoutes from './routes/escalationRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import associatesRoutes from './routes/associatesRoutes.js';
import enquiriesRoutes from './routes/enquiriesRoutes.js';

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your MongoDB URI
const DB_URI = "mongodb+srv://BackendUser:rUOIpCKLc0oVpmtw@clusterkreupai.imb19.mongodb.net/KreupAI";

// Middleware for parsing application/json and application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(DB_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    console.error('Stack Trace:', err.stack);
  });

// Define routes with '/api' prefix
app.use('/api/incidents', incidentRoutes);
app.use('/api/sla', slaRoutes);
app.use('/api/escalation', escalationRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/associates', associatesRoutes);
app.use('/api/enquiries', enquiriesRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Incident Management API');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 
