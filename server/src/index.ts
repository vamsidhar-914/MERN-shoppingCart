import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { sampleProducts } from './data';
import ProductRoutes from './routes/Products';
import userRoutes from './routes/Users';
import seedRoutes from './routes/seedRouter';
import orderRoutes from './routes/order';
import keyRouter from './routes/keyRouter';
import mongoose from 'mongoose';

dotenv.config();

mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('connected to mongoose');
  })
  .catch(() => {
    console.log('error mongodb');
  });

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', ProductRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/keys', keyRouter);
app.use('/api/seed', seedRoutes);

const PORT = 4000;

app.listen(PORT, () => {
  console.log('server is running');
});
