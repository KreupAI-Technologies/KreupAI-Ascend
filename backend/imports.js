//all import statements to be added here

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import epicRoutes from "./modules/PMT/routes/epicRoutes.js";
import assignmentRoutes from "./modules/PMT/routes/assignmentRoutes.js";
import storyRoutes from "./modules/PMT/routes/storyRoutes.js";
import taskRoutes from "./modules/PMT/routes/taskRoutes.js";
import userGroupRoutes from "./modules/PMT/routes/userGroupRoutes.js";
import userRoutes from "./modules/PMT/routes/userRoutes.js";
import ownerRoutes from "./modules/PMT/routes/ownerRoute.js";
import leadRoutes from "./modules/Workflow/routes/leadRoutes.js";
import workflowRoutes from "./modules/Workflow/routes/workflowRoutes.js";
import roleRoutes from "./modules/Workflow/routes/roleRoutes.js";
import ruleRoutes from "./modules/Workflow/routes/ruleRoutes.js";
import userRoutes2 from "./modules/Workflow/routes/userRoutes2.js";
//Debayan
//21.9.24
import aiInsightRoutes from "./modules/Workflow/routes/aiInsightRoutes.js";
import documentRoutes from "./modules/Workflow/routes/documentRoutes.js";
import timeTrackingRoutes from "./modules/Workflow/routes/timeTrackingRoutes.js";
import versionControlRoutes from "./modules/Workflow/routes/versionControlRoutes.js";
import workflowTemplateRoutes from "./modules/Workflow/routes/workflowTemplateRoutes.js";
// Vishesh
import escalationRoutes from "./modules/Workflow/routes/escalationRoutes.js";
import incidentRoutes from "./modules/Workflow/routes/incidentRoutes.js";
import notificationRoutes from "./modules/Workflow/routes/notificationRoutes.js";
import slaRoutes from "./modules/Workflow/routes/slaRoutes.js";

//Khushi
import auditLogRoutes from "./modules/Workflow/routes/auditLogRoutes.js";
import commentsRoutes from "./modules/Workflow/routes/commentsRoutes.js";
import dashboardConfigRoutes from "./modules/Workflow/routes/dashboardConfigRoutes.js";
import integrationRoutes from "./modules/Workflow/routes/integrationRoutes.js";


export {
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
  escalationRoutes,
  notificationRoutes,
  incidentRoutes,
  slaRoutes,
  auditLogRoutes,
  commentsRoutes,
  dashboardConfigRoutes,
  integrationRoutes,




};
