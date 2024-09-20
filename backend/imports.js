//all import statements to be added here 

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import epicRoutes from './routes/PMT_routes/epicRoutes.js'
import storyRoutes from './routes/PMT_routes/storyRoutes.js';
import taskRoutes from './routes/PMT_routes/taskRoutes.js';
import userGroupRoutes from './routes/PMT_routes/userGroupRoutes.js';
import userRoutes from './routes/PMT_routes/userRoutes.js';
import assignmentRoutes from './routes/PMT_routes/assignmentRoutes.js';
import ownerRoutes from './routes/PMT_routes/ownerRoute.js';

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