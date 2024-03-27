import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../context/Store';
import { userSignMutation } from '../hookss/UserHooks';
import { getError } from '../utils';
import { toast } from 'react-toastify';
import { ApiError } from '../types/ApiError';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';

export function SigninPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectUrl ? redirectUrl : '/';

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const { mutateAsync: signin, isPending } = userSignMutation();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await signin({
        email,
        password,
      });
      dispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className='small-container'>
      <Helmet>
        <title>sign in</title>
      </Helmet>
      <h1 className='my-3'>Sign in</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group
          className='mb-3'
          controlId='email'
        >
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            required
            onChange={(e) => setemail(e.target.value)}
          />
        </Form.Group>
        <Form.Group
          className='mb-3'
          controlId='password'
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            required
            onChange={(e) => setpassword(e.target.value)}
          />
        </Form.Group>
        <div className='mb-3'>
          <Button
            disabled={isPending}
            type='submit'
          >
            Sign In
          </Button>
          {isPending && <LoadingBox />}
        </div>
        <div className='mb-3'>
          New customer?{' '}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
}
