import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../context/Store';
import { Helmet } from 'react-helmet-async';
import Checkout from '../components/Checkout';
import { Button, Form } from 'react-bootstrap';

const ShippingAddress = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress },
  } = state;

  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault;
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );

    navigate('/payment');
  };

  return (
    <div>
      <Helmet>
        <title>Shipping Adress</title>
      </Helmet>
      <Checkout
        step1
        step2
      ></Checkout>
      <div className='container small-container'>
        <h1 className='my-3'>Shipping address</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group
            className='mb-3'
            controlId='fullName'
          >
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group
            className='mb-3'
            controlId='address'
          >
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group
            className='mb-3'
            controlId='city'
          >
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group
            className='mb-3'
            controlId='postalCode'
          >
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group
            className='mb-3'
            controlId='country'
          >
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>
          <div className='mb-3'>
            <Button
              variant='primary'
              type='submit'
            >
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ShippingAddress;
