import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routers/authRouter.js'
import boardsRouter from './routers/boardsRouter.js'
import tasksRouter from './routers/tasksRouter.js'
import commentsRouter from './routers/commentsRouter.js'

const app = express();
dotenv.config();
const connectToMongoDB = () => {
  mongoose
    .connect(
      `mongodb+srv://Bohdan:${process.env.PASSWORD}@cluster0.oc3n4.mongodb.net/stetsDo?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log('Connected to MongoDB!');
    })
    .catch((error) => {
      console.log(error);
    });
};
function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'String';
  res.status(status).json({ message });
}

app.use(
  morgan(
    ':method :url HTTP/:http-version" :status :res[content-length] - :response-time ms'
  )
);
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/boards', boardsRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/comments', commentsRouter);



app.use(errorHandler);

app.listen(8080, () => {
  connectToMongoDB();
  console.log('Server has been started!');
});
