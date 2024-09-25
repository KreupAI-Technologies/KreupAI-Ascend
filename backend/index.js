import {
  express,
  mongoose,
  cors,
  dotenv,
  //PMT
  epicRoutes,
  storyRoutes,
  taskRoutes,
  userGroupRoutes,
  userRoutes,
  assignmentRoutes,
  ownerRoutes,
  //CRM
  crmAddressRoutes,
  crmCountyRoutes,
  crmStateRoutes,
  crmCityRoutes,
  crmIndustryRoutes,
  crmPaymentTermRoutes,
  crmPaymentMethodRoutes,
  crmDeliveryTermRoutes,
  crmDivisionRoutes,
  crmStatusRoutes,
  crmAccountRoutes,
  crmDepartmentRoutes,
  crmLeadSourceRoutes,
  crmLeadSubSourceRoutes,
  crmQuotationRoutes,
  crmQuotationLineRoutes,
  crmSalesOrderRoutes,
  crmSalesOrderLineRoutes,
  crmProductRoutes,
  crmProductCategoryRoutes,
  crmCallRoutes,
  crmCallAttendeeRoutes,
  

  //Workflow
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

//CRM
//Tej
app.use("/api/crmAddress",crmAddressRoutes);
app.use("/api/crmCountry",crmCountyRoutes);
app.use("/api/crmState",crmStateRoutes);
app.use("/api/crmCity",crmCityRoutes);
app.use("/api/crmIndustries",crmIndustryRoutes);
app.use("/api/crmPaymentTerm",crmPaymentTermRoutes);
app.use("/api/crmPaymentMethod",crmPaymentMethodRoutes);
app.use("/api/crmDeliveryTerm",crmDeliveryTermRoutes);
app.use("/api/crmDivision",crmDivisionRoutes);
app.use("/api/crmStatus",crmStatusRoutes);
app.use("/api/crmAccount",crmAccountRoutes);
app.use("/api/crmDepartment",crmDepartmentRoutes);
app.use("/api/crmLeadSource",crmLeadSourceRoutes);
app.use("/api/crmLeadSubSource",crmLeadSubSourceRoutes);
app.use("/api/crmQuotation",crmQuotationRoutes);
app.use("/api/crmQuotationLine",crmQuotationLineRoutes);
app.use("/api/crmSalesOrder",crmSalesOrderRoutes);
app.use("/api/crmSalesOrderLine",crmSalesOrderLineRoutes);
app.use("/api/crmProduct",crmProductRoutes);
app.use("/api/crmProductCategory",crmProductCategoryRoutes);
app.use("/api/crmCall",crmCallRoutes);
app.use("/api/crmCallAttendee",crmCallAttendeeRoutes);




//WorkFlow
//Yash
app.use("/api", userRoutes2);
app.use("/api", roleRoutes);
app.use("/api", leadRoutes);
app.use("/api", workflowRoutes);
app.use("/api", ruleRoutes);
//Debayan
//21.9.24
app.use("/api/documents", documentRoutes);
app.use("/api/version-control", versionControlRoutes);
app.use("/api/ai-insights", aiInsightRoutes);
app.use("/api/workflow-templates", workflowTemplateRoutes);
app.use("/api/time-tracking", timeTrackingRoutes);

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
