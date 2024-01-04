
import express from 'express';
import mongoose from 'mongoose';
import connectDb from './connection/connect';
import userRouter from './routes/user'

import cors from 'cors'


connectDb()
const app = express();


// Define a simple route
// app.get('/', (req, res) => {
//   res.send('Hello, this is your backend!');
// });
app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json())
app.use('/user',userRouter)


const port = 8000;


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



