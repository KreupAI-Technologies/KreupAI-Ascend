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
  ownerRoutes
};