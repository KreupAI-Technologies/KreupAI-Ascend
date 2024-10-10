import { connectDB } from "./config/db.js";
import { PORT } from "./config/config.js";

import {
  express,
  cors,
  cookieParser,
  path,
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
  userRoleRoute,
  industryRoute,
  leadSourceRoute,
  leadSubSourceRoute,
  statusRoute,
  countryRoute,
  stateRoute,
  cityRoute,
  addressRoute,
  leadRoute,
} from "./imports.js";

const app = express();
// Middleware
app.use(express.json());
const _dirname=path.dirname("");
const buildpath=path.join(_dirname,"../web/dist");
app.use(express.static(buildpath));
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
app.use("/api", userRoleRoute);
app.use("/api", industryRoute);
app.use("/api", leadSourceRoute);
app.use("/api", leadSubSourceRoute);
app.use("/api", statusRoute);
app.use("/api", countryRoute);
app.use("/api", stateRoute);
app.use("/api", cityRoute);
app.use("/api", addressRoute);
app.use("/api", leadRoute);

app.get("/", (req, res) => {
  res.send("BackEnd is running.");
});

// Database Connection and Server Start
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
