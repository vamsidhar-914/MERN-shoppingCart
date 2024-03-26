import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { sampleProducts } from './data';
import ProductRoutes from './routes/Products';
import seedRoutes from './routes/seedRouter';
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
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
);

app.use('/api/products', ProductRoutes);
app.use('/api/seed', seedRoutes);

const PORT = 4000;

app.listen(PORT, () => {
  console.log('server is running');
});
