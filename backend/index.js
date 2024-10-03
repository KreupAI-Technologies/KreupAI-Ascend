
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
 

import {
  express,
  mongoose,
  cors,
  dotenv,
  epicRoutes,
  storyRoutes,
  taskRoutes,
  userGroupRoutes,
  userRoutes,
  assignmentRoutes,
  ownerRoutes,
  leadRoutes,
  workflowRoutes,
  roleRoutes,
  ruleRoutes,
  userRoutes2,
  aiInsightRoutes,
  documentRoutes,
  timeTrackingRoutes,
  versionControlRoutes,
  workflowTemplateRoutes,
  slaRoutes,
  escalationRoutes,
  incidentRoutes,
  notificationRoutes,
  auditLogRoutes,
  commentsRoutes,
  dashboardConfigRoutes,
  integrationRoutes,
  clarificationsRoutes,
  incidentHeaderRoutes,
} from "./imports.js";

dotenv.config();
const app = express();
// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/epics", epicRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/userGroups", userGroupRoutes);
app.use("/api/users", userRoutes);
app.use("/api", assignmentRoutes);
app.use("/api/owners", ownerRoutes);
// Yash
app.use("/api", userRoutes2);
app.use("/api", roleRoutes);
app.use("/api", leadRoutes);
app.use("/api", workflowRoutes);
app.use("/api", ruleRoutes);
app.use("/api",clarificationsRoutes);
//Debayan
//21.9.24
app.use("/api/documents", documentRoutes);
app.use("/api/version-control", versionControlRoutes);
app.use("/api/ai-insights", aiInsightRoutes);
app.use("/api/workflow-templates", workflowTemplateRoutes);
app.use("/api/time-tracking", timeTrackingRoutes);
// Vishesh
app.use("/api/escalations", escalationRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/sla", slaRoutes);
//khushi
app.use("/api/auditLog", auditLogRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/dashboardConfig", dashboardConfigRoutes);
app.use("/api/integration", integrationRoutes);
//Tejas
app.use("/api/incidentHeaderRoutes", incidentHeaderRoutes);




app.get("/", (req, res) => {
  res.send("BackEnd is running.");
});
// Database Connection and Server Start
const port = process.env.PORT || 5002;
const conn = process.env.URI;

// mongoose.connect(process.env.MONGODB_URI)
mongoose
  .connect(conn)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB...", err);
  });

