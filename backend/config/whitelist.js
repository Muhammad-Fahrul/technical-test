import dotenv from 'dotenv';
dotenv.config();
export default [
  process.env.WHITELIST_ORIGIN,
  'http://localhost:4200',
  'http://localhost:5000',
];
