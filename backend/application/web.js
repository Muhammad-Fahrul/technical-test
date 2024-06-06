import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import corsOption from '../config/corsOption.js';
import cookieParser from 'cookie-parser';

import authRoutes from '../routes/authRoutes.js';
import noteRoutes from '../routes/noteRoutes.js';
import errorHandler from '../middleware/errorHandler.js';

import path from 'path';
const __dirname = path.resolve();

const app = express();
app.use(cookieParser());
app.use(cors(corsOption));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/auths', authRoutes);
app.use('/api/notes', noteRoutes);

app.use(
  express.static(path.join(__dirname, './frontend/dist/frontend/browser'))
);

app.get('*', (req, res) =>
  res.sendFile(
    path.resolve(
      __dirname,
      './',
      'frontend',
      'dist',
      'frontend',
      'browser',
      'index.html'
    )
  )
);

app.use(errorHandler);

export default app;
