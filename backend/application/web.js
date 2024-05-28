import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('hai');
});

export default app;
