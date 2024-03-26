import { Button, Card } from 'react-bootstrap';
import { ProductType } from '../types/ProductType';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { useContext } from 'react';
import { Store } from '../context/Store';
import { CartType } from '../types/CartType';
import { convertProductToCartItem } from '../utils';
import { toast } from 'react-toastify';

type PropsType = {
  product: ProductType;
};

function ProductItem({ product }: PropsType) {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const handleAddToCart = (item: CartType) => {
    const existsItem = cartItems.find((x) => x._id === product._id);
    const quantity = existsItem ? existsItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      toast.warn('sorry. Product is out of stock');
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
    toast.success('Product added to cart');
  };

  return (
    <Card>
      <Link
        to={`/product/${product.slug}`}
        className='nav-link'
      >
        <img
          src={product.image}
          alt={product.name}
          className='card-img-top'
        />
      </Link>
      <Card.Body>
        <Link
          to={`/product/${product.slug}`}
          className='nav-link'
        >
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button
            variant='light'
            disabled
          >
            Out of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddToCart(convertProductToCartItem(product))}
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductItem;
