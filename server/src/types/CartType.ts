export type CartType = {
  image: string | undefined;
  slug: string;
  quantity: number;
  countInStock: number;
  price: number;
  _id: string;
  name: string;
};

export type ShippingAddress = {
  fullName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
};

export type Cart = {
  itemsPrice: number;
  shippingPrice: number;
  taxtPrice: number;
  totalPrice: number;
  cartItems: CartType[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
};
