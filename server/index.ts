
import express from 'express';
import mongoose from 'mongoose';
import connectDb from './connection/connect';
import userRouter from './routes/user'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { verifyJwt } from './middlewares/authentication';
import blogRouter from './routes/blog';
import commentRouter from './routes/comment';


connectDb()
const app = express();


// Define a simple route
// app.get('/', (req, res) => {
//   res.send('Hello, this is your backend!');
// });
app.use(cors({
  origin: 'http://localhost:5173',
  credentials:true
}));

app.use(express.json())
app.use(cookieParser());
// app.use(verifyJwt("token"));
app.use(express.static('public')) 

app.use('/user',userRouter)
app.use('/blog',blogRouter)
app.use('/comment',commentRouter)
const port = 8000;


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



