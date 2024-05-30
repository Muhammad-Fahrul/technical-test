import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import corsOption from '../config/corsOption.js';
import cookieParser from 'cookie-parser';

import authRoutes from '../routes/authRoutes.js';
import noteRoutes from '../routes/noteRoutes.js';
import errorHandler from '../middleware/errorHandler.js';

const app = express();
app.use(cookieParser());
app.use(cors(corsOption));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/auths', authRoutes);
app.use('/api/notes', noteRoutes);

app.use(errorHandler);

export default app;
