import { connectDB } from "./config/db.js";
import { PORT } from "./config/config.js";
import {
  express,
  cors,
  cookieParser,
  epicRoutes,
  // storyRoutes,
  taskRoutes,
  userGroupRoutes,
  // userRoutes,
  // assignmentRoutes,
  ownerRoutes,
  leadRoutes,
  workflowRoutes,
  roleRoutes,
  ruleRoutes,
  userRoutes2,
  authRoute,
  divisionRoute,
  departmentRoute,
} from "./imports.js";

const app = express();
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Routes
app.use("/api/epics", epicRoutes);
// app.use("/api/stories", storyRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/userGroups", userGroupRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api", assignmentRoutes);
app.use("/api/owners", ownerRoutes);
app.use("/api", userRoutes2);
app.use("/api", roleRoutes);
app.use("/api", leadRoutes);
app.use("/api", workflowRoutes);
app.use("/api", ruleRoutes);

//CRM API
app.use("/api", authRoute);
app.use("/api", divisionRoute);
app.use("/api", departmentRoute);

app.get("/", (req, res) => {
  res.send("BackEnd is running.");
});

// Database Connection and Server Start
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
