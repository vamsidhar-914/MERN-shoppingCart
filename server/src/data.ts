import { User } from './models/User';
import { Product } from './models/Product';
import bcrypt from 'bcryptjs';

export const sampleProducts: Product[] = [
  {
    name: 'Nike Slim shirt',
    slug: 'nike-slim-shirt',
    category: 'Shirts',
    image: '../images/p1.jpg',
    price: 120,
    countInStock: 10,
    brand: 'Nike',
    rating: 4.5,
    numReviews: 10,
    description: 'high quality shirt',
  },
  {
    name: 'Adidas-fit-shirt',
    slug: 'adidas-fit-shirt',
    category: 'Shirts',
    image: '../images/p2.jpg',
    price: 100,
    countInStock: 20,
    brand: 'Adidas',
    rating: 4.0,
    numReviews: 10,
    description: 'high quality Product',
  },
  {
    name: 'Lactose Free Pants',
    slug: 'lactose-free-pants',
    category: 'Pants',
    image: '../images/p3.jpg',
    price: 220,
    countInStock: 0,
    brand: 'Lactose',
    rating: 4.8,
    numReviews: 17,
    description: 'high quality shirt',
  },
  {
    name: 'Nike Slim Pant',
    slug: 'nike-slim-pant',
    category: 'Pants',
    image: '../images/p4.jpg',
    price: 70,
    countInStock: 15,
    brand: 'Nike',
    rating: 4.5,
    numReviews: 14,
    description: 'high quality shirt',
  },
];

export const sampleUsers: User[] = [
  {
    name: 'vamsi',
    email: 'vamsi@gmail.com',
    password: bcrypt.hashSync('vamsi'),
    isAdmin: true,
  },
  {
    name: 'john',
    email: 'john@john.com',
    password: bcrypt.hashSync('john'),
    isAdmin: false,
  },
];
