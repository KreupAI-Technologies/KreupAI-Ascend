// config/env.js
import dotenv from 'dotenv';

dotenv.config(); // Loads .env file

export const PORT = process.env.PORT || 5002;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';