import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';
import HomePage from './pages/HomePage.tsx';
import ProductPage from './ProductPage.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StoreProvider } from './context/Store.tsx';
import CartPage from './pages/CartPage.tsx';
import { SigninPage } from './pages/SigninPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import ShippingAddress from './pages/shippingAddress.tsx';
import PaymentPage from './pages/PaymentPage.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import PlaceOrder from './pages/PlaceOrder.tsx';
import OrderPage from './pages/OrderPage.tsx';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<App />}
    >
      <Route
        index={true}
        element={<HomePage />}
      />
      <Route
        path='product/:slug'
        element={<ProductPage />}
      />
      <Route
        path='cart'
        element={<CartPage />}
      />
      <Route
        path='signin'
        element={<SigninPage />}
      />
      <Route
        path='signup'
        element={<SignupPage />}
      />
      <Route
        path=''
        element={<ProtectedRoute />}
      >
        <Route
          path='shipping'
          element={<ShippingAddress />}
        />
        <Route
          path='payment'
          element={<PaymentPage />}
        />
        <Route
          path='placeOrder'
          element={<PlaceOrder />}
        />
        <Route
          path='/order/:id'
          element={<OrderPage />}
        />
      </Route>
    </Route>
  )
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <PayPalScriptProvider
        options={{ clientId: 'sb' }}
        deferLoading={true}
      >
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </HelmetProvider>
      </PayPalScriptProvider>
    </StoreProvider>
  </React.StrictMode>
);
