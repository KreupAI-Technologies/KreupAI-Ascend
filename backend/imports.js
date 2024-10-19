//all import statements to be added here

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path"

import epicRoutes from "./modules/PMT/routes/epicRoutes.js";
// import assignmentRoutes from "./modules/PMT/routes/assignmentRoutes.js";
// import storyRoutes from "./modules/PMT/routes/storyRoutes.js";
// import taskRoutes from "./modules/PMT/routes/taskRoutes.js";
import userGroupRoutes from "./modules/PMT/routes/userGroupRoutes.js";
// import userRoutes from "./modules/PMT/routes/userRoutes.js";
import ownerRoutes from "./modules/PMT/routes/ownerRoute.js";

//CRM Imports
import authRoute from "./routes/authRoute.js";
import divisionRoute from "./routes/divisionRoute.js";
import departmentRoute from "./routes/departmentRoute.js";
import roleRoute from "./modules/CRM/routes/roleRoute.js";
import userRoleRoute from "./modules/CRM/routes/userRoleRoute.js";
import industryRoute from "./modules/CRM/routes/industryRoute.js";
import leadSourceRoute from "./modules/CRM/routes/leadSourceRoute.js";
import leadSubSourceRoute from "./modules/CRM/routes/leadSubSourceRoute.js";
import statusRoute from "./modules/CRM/routes/statusRoute.js";
import countryRoute from "./routes/countryRoute.js";
import stateRoute from "./routes/stateRoute.js";
import cityRoute from "./routes/cityRoute.js";
import addressRoute from "./routes/addressRoute.js";
import leadRoute from "./modules/CRM/routes/leadRoute.js";
import deliveryTerm from "./modules/CRM/routes/deliveryTermRoute.js";
import paymentTerm from "./modules/CRM/routes/paymentTermRoute.js";
import paymentMethod from "./modules/CRM/routes/paymentMethodRoute.js";
import attachment from "./modules/CRM/routes/attachmentRoute.js";
import note from "./modules/CRM/routes/noteRoute.js";
import task from "./modules/CRM/routes/taskRoute.js";
import call from "./modules/CRM/routes/callRoute.js";
import callAttendee from "./modules/CRM/routes/callAttendeeRoute.js";
import meeting from "./modules/CRM/routes/meetingRoute.js";
import meetingAttendee from "./modules/CRM/routes/meetingAttendeeRoute.js";
import contactRoute from "./modules/CRM/routes/contactRoute.js"
import opportunityRoute from "./modules/CRM/routes/opportunityRoute.js"
import quotationRoute from "./modules/CRM/routes/quotationRoute.js"
import clientPriceBookRoute from "./modules/CRM/routes/clientPriceBookRoute.js"
import productRoute from "./modules/CRM/routes/productRoute.js"
import salesOrderRoute from "./modules/CRM/routes/salesOrderRoute.js"

//Workflow Imports
import aiInsightRoute from "./modules/Workflow/routes/aiInsightRoute.js";
import associatesRoute from "./modules/Workflow/routes/associatesRoute.js";
import auditLogRoute from "./modules/Workflow/routes/auditLogRoute.js";
import clarificationsRoute from "./modules/Workflow/routes/clarificationsRoute.js";
import coAccountsRoute from "./modules/Workflow/routes/coAccountsRoute.js";
import commentsRoute from "./modules/Workflow/routes/commentsRoute.js";
import currenciesRoute from "./modules/Workflow/routes/currenciesRoute.js";
import currencyRatesRoute from "./modules/Workflow/routes/currencyRatesRoute.js";
import dashboardConfigRoute from "./modules/Workflow/routes/dashboardConfigRoute.js";
import dimensionRoute from "./modules/Workflow/routes/dimensionRoute.js";
import documentRoute from "./modules/Workflow/routes/documentRoute.js";
import enquiriesRoute from "./modules/Workflow/routes/enquiriesRoute.js";
import escalationRoute from "./modules/Workflow/routes/escalationRoute.js";
import generalLedgerRoute from "./modules/Workflow/routes/generalLedgerRoute.js";
import chequeMasterRoutes from './modules/Workflow/routes/chequeMasterRoutes.js';
import bpMethodRoutes from './modules/Workflow/routes/bpMethodRoutes.js';
// import glOpeningRoute from "./modules/Workflow/routes/glOpeningRoute.js";
import incidentRoute from "./modules/Workflow/routes/incidentRoute.js";
import incidentHeaderRoute from "./modules/Workflow/routes/incidentHeaderRoute.js";
import integrationRoute from "./modules/Workflow/routes/integrationRoute.js";
import integrationProcessRoute from "./modules/Workflow/routes/integrationProcessRoute.js";
import workflowLeadRoute from "./modules/Workflow/routes/workflowLeadRoute.js";
import ledgerSummaryRoute from "./modules/Workflow/routes/ledgerSummaryRoute.js";
import notificationRoute from "./modules/Workflow/routes/notificationRoute.js";
import periodsRoute from "./modules/Workflow/routes/periodsRoute.js";
import workflowRoleRoute from "./modules/Workflow/routes/workflowRoleRoute.js";
import ruleRoute from "./modules/Workflow/routes/ruleRoute.js";
import slaRoute from "./modules/Workflow/routes/slaRoute.js";
import standardRulesRoute from "./modules/Workflow/routes/standardRulesRoute.js";
import timeTrackingRoute from "./modules/Workflow/routes/timeTrackingRoute.js";
import transactionTypesRoute from "./modules/Workflow/routes/transactionTypesRoute.js";
import workflowUserRoute from "./modules/Workflow/routes/workflowUserRoute.js";
import versionControlRoute from "./modules/Workflow/routes/versionControlRoute.js";
import workflowRoute from "./modules/Workflow/routes/workflowRoute.js";
import workflowTemplateRoute from "./modules/Workflow/routes/workflowTemplateRoute.js";
import cashTypeRoute from "./modules/Workflow/routes/cashTypeRoute.js";
import bankBranchRoute from "./modules/Workflow/routes/bankBranchRoute.js";
import bankAccountRoute from "./modules/Workflow/routes/bankAccountRoute.js";





export {
  express,
  mongoose,
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
  chequeMasterRoutes,
  bpMethodRoutes,
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
};
