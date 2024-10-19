import { connectDB } from "./config/db.js";
import { PORT } from "./config/config.js";

import {
  express,
  cors,
  cookieParser,
  path,
  epicRoutes,
  // storyRoutes,
  // taskRoutes,
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
  deliveryTerm,
  paymentTerm,
  paymentMethod,
  attachment,
  note,
  task,
  call,
  callAttendee,
  meeting,
  meetingAttendee,
  contactRoute,
  opportunityRoute,
  quotationRoute,
  clientPriceBookRoute,
  productRoute,
  salesOrderRoute,
  salesOrderLineRoute,
  quotationLineRoute,

  // Workflow Imports
  aiInsightRoute,
  associatesRoute,
  auditLogRoute,
  clarificationsRoute,
  coAccountsRoute,
  commentsRoute,
  currenciesRoute,
  currencyRatesRoute,
  dashboardConfigRoute,
  dimensionRoute,
  documentRoute,
  enquiriesRoute,
  escalationRoute,
  generalLedgerRoute,
  // glOpeningRoute,
  incidentRoute,
  incidentHeaderRoute,
  integrationRoute,
  integrationProcessRoute,
  workflowLeadRoute,
  ledgerSummaryRoute,
  notificationRoute,
  periodsRoute,
  workflowRoleRoute,
  ruleRoute,
  slaRoute,
  standardRulesRoute,
  timeTrackingRoute,
  transactionTypesRoute,
  workflowUserRoute,
  versionControlRoute,
  workflowRoute,
  workflowTemplateRoute,
  cashTypeRoute,
  bankBranchRoute,
  bankAccountRoute,
  chequeMasterRoutes,
  bpMethodRoutes,
} from "./imports.js";

const app = express();
// Middleware
app.use(express.json());
const _dirname=path.dirname("");
const buildpath=path.join(_dirname,"../web/dist");
app.use(express.static(buildpath));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// PMT Routes
app.use("/api/epics", epicRoutes);
// app.use("/api/stories", storyRoutes);
// app.use("/api/tasks", taskRoutes);
app.use("/api/userGroups", userGroupRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api", assignmentRoutes);
app.use("/api/owners", ownerRoutes);

// CRM Routes
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
app.use("/api", deliveryTerm);
app.use("/api", paymentTerm);
app.use("/api", paymentMethod);
app.use("/api", attachment);
app.use("/api", note);
app.use("/api", task);
app.use("/api", call);
app.use("/api", callAttendee);
app.use("/api", meeting);
app.use("/api", meetingAttendee);
app.use("/api", contactRoute);
app.use("/api", opportunityRoute);
app.use("/api", quotationRoute);
app.use("/api", clientPriceBookRoute);
app.use("/api", productRoute);
app.use("/api", salesOrderRoute);
app.use("/api", salesOrderLineRoute);
app.use("/api", quotationLineRoute);

// Workflow Routes
app.use("/api", aiInsightRoute);
app.use("/api", associatesRoute);
app.use("/api", auditLogRoute);
app.use("/api", clarificationsRoute);
app.use("/api", coAccountsRoute);
app.use("/api", commentsRoute);
app.use("/api", currenciesRoute);
app.use("/api", currencyRatesRoute);
app.use("/api", dashboardConfigRoute);
app.use("/api", dimensionRoute);
app.use("/api", documentRoute);
app.use("/api", enquiriesRoute);
app.use("/api", escalationRoute);
app.use("/api", generalLedgerRoute);
app.use("/api", chequeMasterRoutes); 
app.use("/api", bpMethodRoutes);
// app.use("/api", glOpeningRoute);
app.use("/api", incidentRoute);
app.use("/api", incidentHeaderRoute);
app.use("/api", integrationRoute);
app.use("/api", integrationProcessRoute);
app.use("/api", workflowLeadRoute);
app.use("/api", ledgerSummaryRoute);
app.use("/api", notificationRoute);
app.use("/api", periodsRoute);
app.use("/api", workflowRoleRoute);
app.use("/api", ruleRoute);
app.use("/api", slaRoute);
app.use("/api", standardRulesRoute);
app.use("/api", timeTrackingRoute);
app.use("/api", transactionTypesRoute);
app.use("/api", workflowUserRoute);
app.use("/api", versionControlRoute);
app.use("/api", workflowRoute);
app.use("/api", workflowTemplateRoute);
app.use("/api", cashTypeRoute);
app.use("/api", bankBranchRoute);
app.use("/api", bankAccountRoute); 

app.get("/", (req, res) => {
  res.send("BackEnd is running.");
});

// Database Connection and Server Start
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
