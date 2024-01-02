
import express from 'express';
import mongoose from 'mongoose';
import connectDb from './connection/connect';

// Create an Express application
connectDb()
const app = express();


// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, this is your backend!');
});

const port = 8000;


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



