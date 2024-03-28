import { CartType, ShippingAddress } from './CartType';
import { UserInfo } from './UserInfo';

export type Order = {
  _id: string;
  orderItems: CartType[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  user: UserInfo;
  createdAt: string;
  isPaid: boolean;
  paidAt: string;
  isDelivered: boolean;
  deliveredAt: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};
