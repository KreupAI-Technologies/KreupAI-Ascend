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
  authRoute,
  divisionRoute,
  departmentRoute,
  roleRoute,
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

//CRM API
app.use("/api", authRoute);
app.use("/api", divisionRoute);
app.use("/api", departmentRoute);
app.use("/api", roleRoute);

app.get("/", (req, res) => {
  res.send("BackEnd is running.");
});

// Database Connection and Server Start
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
