import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { UseGetProductDetailsBySlugQuery } from './hookss/ProductHooks';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import { getError } from './utils';
import { ApiError } from './types/ApiError';
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import Rating from './components/Rating';
import { useContext } from 'react';
import { Store } from './context/Store';
import { toast } from 'react-toastify';
import { convertProductToCartItem } from './utils';

const ProductPage = () => {
  const params = useParams();
  const { slug } = params;
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    error,
  } = UseGetProductDetailsBySlugQuery(slug!);

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const handleAddToCart = () => {
    const existsItem = cart.cartItems.find((x) => x._id === product!._id);
    const quantity = existsItem ? existsItem.quantity + 1 : 1;
    if (product!.countInStock < quantity) {
      toast.warn('sorry. Product is out of stock');
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...convertProductToCartItem(product!), quantity },
    });
    toast.success('Product added to the cart');
    navigate('/cart');
  };

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant='danger'>{getError(error as ApiError)}</MessageBox>
  ) : !product ? (
    <MessageBox variant='danger'>Not found</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Product Page</title>
      </Helmet>
      <Row>
        <Col md={6}>
          <img
            className='large'
            src={product.image}
            alt={product.name}
          />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg='success'>In Stock</Badge>
                      ) : (
                        <Badge bg='success'>Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className='d-grid'>
                      <Button
                        onClick={handleAddToCart}
                        variant='primary'
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductPage;
