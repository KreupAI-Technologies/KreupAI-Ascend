//all import statements to be added here

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import epicRoutes from "./modules/PMT/routes/epicRoutes.js";
// import assignmentRoutes from "./modules/PMT/routes/assignmentRoutes.js";
// import storyRoutes from "./modules/PMT/routes/storyRoutes.js";
import taskRoutes from "./modules/PMT/routes/taskRoutes.js";
import userGroupRoutes from "./modules/PMT/routes/userGroupRoutes.js";
// import userRoutes from "./modules/PMT/routes/userRoutes.js";
import ownerRoutes from "./modules/PMT/routes/ownerRoute.js";


//CRM Imports
import authRoute from "./routes/authRoute.js";
import divisionRoute from "./routes/divisionRoute.js";
import departmentRoute from "./routes/departmentRoute.js";
import roleRoute from "./modules/CRM/routes/roleRoute.js";
import userRoleRoute from "./modules/CRM/routes/userRoleRoute.js"
import industryRoute from "./modules/CRM/routes/industryRoute.js"
import leadSourceRoute from "./modules/CRM/routes/leadSourceRoute.js"
import leadSubSourceRoute from "./modules/CRM/routes/leadSubSourceRoute.js"
import statusRoute from "./modules/crm/routes/statusRoute.js"
import countryRoute from "./routes/countryRoute.js"
import stateRoute from "./routes/stateRoute.js"
import cityRoute from "./routes/cityRoute.js"
import addressRoute from "./routes/addressRoute.js"
import leadRoute from "./modules/CRM/routes/leadRoute.js"
 
export {
  express,
  mongoose,
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
};
