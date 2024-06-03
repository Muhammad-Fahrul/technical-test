import dotenv from 'dotenv';
dotenv.config();
export default [
  process.env.WHITELIST_ORIGIN,
  'http://localhost:3500',
  'http://127.0.0.1:3500',
  'http://localhost:4401',
];
