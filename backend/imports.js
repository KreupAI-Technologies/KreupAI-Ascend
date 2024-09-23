//all import statements to be added here 

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import epicRoutes from './modules/PMT/routes/epicRoutes.js'
import assignmentRoutes from './modules/PMT/routes/assignmentRoutes.js'
import storyRoutes from './modules/PMT/routes/storyRoutes.js';
import taskRoutes from './modules/PMT/routes/taskRoutes.js';
import userGroupRoutes from './modules/PMT/routes/userGroupRoutes.js';
import userRoutes from './modules/PMT/routes/userRoutes.js';
import ownerRoutes from './modules/PMT/routes/ownerRoute.js';
import leadRoutes from './modules/Workflow/routes/leadRoutes.js';
import workflowRoutes from './modules/Workflow/routes/workflowRoutes.js';
import roleRoutes from './modules/Workflow/routes/roleRoutes.js';
import ruleRoutes from './modules/Workflow/routes/ruleRoutes.js';
import userRoutes2 from './modules/Workflow/routes/userRoutes2.js';
import commentRoutes from './modules/Workflow/routes/commentRoutes.js';
import dashboardConfigRoutes from './modules/Workflow/routes/dashboardConfigRoutes.js';
import auditLogRoutes from './modules/Workflow/routes/auditLogRoutes.js';
import integrationRoutes from './modules/Workflow/routes/integrationRoutes.js';

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
  commentRoutes,
  dashboardConfigRoutes,
  auditLogRoutes,
  integrationRoutes,
};