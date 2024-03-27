import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { ProductModel } from '../models/Product';
import { sampleProducts, sampleUsers } from '../data';
import { UserModel } from '../models/User';
const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    await ProductModel.deleteMany({});
    const createdProducts = await ProductModel.insertMany(sampleProducts);

    await UserModel.deleteMany({});
    const createdUsers = await UserModel.insertMany(sampleUsers);
    res.json({ createdProducts, createdUsers });
  })
);

export default router;
