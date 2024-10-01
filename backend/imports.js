import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import incidentRoutes from './routes/incidentsRoutes.js';
import slaRoutes from './routes/slaRoutes.js';
import escalationRoutes from './routes/escalationRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import associatesRoutes from './routes/associatesRoutes.js';
import enquiriesRoutes from './routes/enquiriesRoutes.js';

export {
  express,
  mongoose,
  cors,
  dotenv,
  incidentRoutes,
  slaRoutes,
  escalationRoutes,
  notificationRoutes,
  associatesRoutes,
  enquiriesRoutes,
};