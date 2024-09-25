import { connectDB } from "./config/db.js";
import { PORT } from "./config/env.js";
import {
  express,
  cors,
  cookieParser,
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
  crmUserRoutes,
  crmDivisionRoutes,
  crmDepartmentRoutes,
} from "./imports.js";

const app = express();
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api/epics", epicRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/userGroups", userGroupRoutes);
app.use("/api/users", userRoutes);
app.use("/api", assignmentRoutes);
app.use("/api/owners", ownerRoutes);
app.use("/api", userRoutes2);
app.use("/api", roleRoutes);
app.use("/api", leadRoutes);
app.use("/api", workflowRoutes);
app.use("/api", ruleRoutes);

//CRM API
app.use("/api", crmUserRoutes);
app.use("/api", crmDivisionRoutes);
app.use("/api", crmDepartmentRoutes);

app.get("/", (req, res) => {
  res.send("BackEnd is running.");
});

// Database Connection and Server Start
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
