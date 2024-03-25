import { Button, Card } from 'react-bootstrap';
import { ProductType } from '../types/ProductType';
import { Link } from 'react-router-dom';
import Rating from './Rating';

type PropsType = {
  product: ProductType;
};

function ProductItem({ product }: PropsType) {
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className='card-img-top'
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
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
          <Button>Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductItem;
