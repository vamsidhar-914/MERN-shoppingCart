import express from 'express';
import asyncHandler from 'express-async-handler';
import { ProductModel } from '../models/Product';
const router = express.Router();

// fetch prodcuts
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await ProductModel.find();
    res.json(products);
  })
);

router.get(
  '/slug/:slug',
  asyncHandler(async (req, res) => {
    const products = await ProductModel.findOne({ slug: req.params.slug });
    if (products) {
      res.json(products);
    } else {
      res.status(404).json({ message: 'Not found product' });
    }
  })
);

export default router;
