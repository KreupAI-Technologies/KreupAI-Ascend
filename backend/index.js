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
    commentRoutes,
    dashboardConfigRoutes,
    auditLogRoutes,
    integrationRoutes,
  } from './imports.js';

dotenv.config();
const app = express();
// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/epics', epicRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/userGroups', userGroupRoutes);
app.use('/api/users', userRoutes);
app.use('/api', assignmentRoutes);
app.use('/api/owners', ownerRoutes);
app.use("/api", userRoutes2);
app.use("/api", roleRoutes);
app.use("/api", leadRoutes);
app.use("/api", workflowRoutes);
app.use("/api", ruleRoutes);
app.use("/api/incidents", commentRoutes);
app.use("/api/dashboard-configs", dashboardConfigRoutes);
app.use('/api/audit-logs', auditLogRoutes);
app.use('/api/integrations', integrationRoutes);




app.get("/",(req,res)=>{
    res.send("BackEnd is running.")

})
// Database Connection and Server Start
const port = process.env.PORT || 5002; 
const conn = process.env.URI

// mongoose.connect(process.env.MONGODB_URI)
mongoose.connect(conn)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Could not connect to MongoDB...', err);
    });
