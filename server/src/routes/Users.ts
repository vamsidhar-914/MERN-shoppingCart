import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/User';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils';
const router = express.Router();

// POST api/users/signIn
router.post(
  '/signin',
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const foundUser = await UserModel.findOne({ email });
    if (foundUser) {
      const match = bcrypt.compareSync(password, foundUser.password);
      if (match) {
        res.json({
          _id: foundUser._id,
          name: foundUser.name,
          email: foundUser.email,
          isAdmin: foundUser.isAdmin,
          token: generateToken(foundUser),
        });
        return;
      }
    }
    res.status(401).json({ message: 'Invallid email or password' });
  })
);

router.post(
  '/signup',
  asyncHandler(async (req: Request, res: Response) => {
    const User = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    } as User);
    res.json({
      _id: User._id,
      name: User.name,
      email: User.email,
      isAdmin: User.isAdmin,
      token: generateToken(User),
    });
  })
);

export default router;
