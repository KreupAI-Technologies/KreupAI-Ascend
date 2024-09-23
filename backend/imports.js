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

//CRM
//Tej
import crmAddressRoutes from "./modules/CRM/routes/crmAddressRoutes.js";
import crmCountyRoutes from "./modules/CRM/routes/crmCountryRoutes.js";
import crmCityRoutes from "./modules/CRM/routes/crmCityRoutes.js";
import crmStateRoutes from "./modules/CRM/routes/crmStateRoutes.js";
import crmIndustryRoutes from "./modules/CRM/routes/crmIndustryRoutes.js";
import crmPaymentTermRoutes from "./modules/CRM/routes/crmPaymentTermRoutes.js";
import crmPaymentMethodRoutes from "./modules/CRM/routes/crmPaymentMethodRoutes.js";
import crmDeliveryTermRoutes from "./modules/CRM/routes/crmDeliveryTermRoutes.js";
import crmDivisionRoutes from "./modules/CRM/routes/crmDivisionRoutes.js";
import crmStatusRoutes from "./modules/CRM/routes/crmStatusRoutes.js";
import crmAccountRoutes from "./modules/CRM/routes/crmAccountRoutes.js";
import crmDepartmentRoutes from "./modules/CRM/routes/crmDepartmentRoutes.js";
import crmLeadSourceRoutes from "./modules/CRM/routes/crmLeadSourceRoutes.js";
import crmLeadSubSourceRoutes from "./modules/CRM/routes/crmLeadSubSourceRoutes.js";
import crmQuotationRoutes from "./modules/CRM/routes/crmQuotationRoutes.js";
import crmQuotationLineRoutes from "./modules/CRM/routes/crmQuotationLineRoutes.js";
import crmSalesOrderRoutes from "./modules/CRM/routes/crmSalesOrderRoutes.js";
import crmSalesOrderLineRoutes from "./modules/CRM/routes/crmSalesOrderLineRoutes.js";
import crmProductRoutes from "./modules/CRM/routes/crmProductRoutes.js";
import crmProductCategoryRoutes from "./modules/CRM/routes/crmProductCategoryRoutes.js";





//Workflow
//Yash 
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

export {
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
};
