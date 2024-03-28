import express, { Response, Request } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../utils';
import { OrderModel } from '../models/Order';
import { Product } from '../models/Product';
const router = express.Router();

router.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const orders = await OrderModel.find({ user: req.user._id });
    res.json(orders);
  })
);

router.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const order = await OrderModel.findById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).send({ message: 'Order not found' });
    }
  })
);

router.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req: Request, res: Response) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'Cart is empty' });
    } else {
      const createOrder = await OrderModel.create({
        orderItems: req.body.orderItems.map((x: Product) => ({
          ...x,
          product: x._id,
        })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      res.status(201).json({ message: 'order created', order: createOrder });
    }
  })
);

router.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await OrderModel.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = new Date(Date.now());
      order.paymentResult = {
        paymentId: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updateOrder = await order.save();
      res.json({ order: updateOrder, message: 'order paid successfully' });
    } else {
      res.status(404).send({ message: 'Order not found' });
    }
  })
);

export default router;
