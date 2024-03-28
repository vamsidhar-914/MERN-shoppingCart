import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../context/Store';
import Checkout from '../components/Checkout';
import { Helmet } from 'react-helmet-async';
import { Button, Form } from 'react-bootstrap';

export default function PaymentPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;
  const [paymentMethodname, setPaymentMethodname] = useState(
    paymentMethod || 'PayPal'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodname });
    localStorage.setItem('paymentMethod', paymentMethodname);
    navigate('/placeOrder');
  };

  return (
    <div>
      <Checkout
        step1
        step2
        step3
      ></Checkout>
      <div className='container small-container'>
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className='my-3'>Payment Method</h1>
        <Form onSubmit={handleSubmit}>
          <div className='my-3'>
            <Form.Check
              type='radio'
              id='PayPal'
              label='PayPal'
              value='PayPal'
              checked={paymentMethodname === 'PayPal'}
              onChange={(e) => setPaymentMethodname(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <Form.Check
              type='radio'
              id='Stripe'
              label='Stripe'
              value='Stripe'
              checked={paymentMethodname === 'Stripe'}
              onChange={(e) => setPaymentMethodname(e.target.value)}
            />
          </div>
          <div className=''>
            <Button type='submit'>Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
