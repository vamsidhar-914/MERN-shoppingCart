import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { LinkContainer } from 'react-router-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from './context/Store';

function App() {
  const {
    state: { mode, cart },
    dispatch,
  } = useContext(Store);

  console.log(mode);

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode);
  }, [mode]);

  const handleSwitchMode = () => [dispatch({ type: 'SWITCH_MODE' })];

  return (
    <div className='d-flex flex-column vh-100'>
      <ToastContainer
        position='bottom-center'
        limit={1}
      />
      <header>
        <Navbar expand='lg'>
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand>amazon</Navbar.Brand>
            </LinkContainer>
          </Container>
          <Nav>
            <Button
              variant={mode}
              onClick={handleSwitchMode}
            >
              <i className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'} />
            </Button>
            <Link
              to='/cart'
              className='nav-link'
            >
              Cart
              {cart.cartItems.length > 0 && (
                <Badge
                  pill
                  bg='danger'
                >
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
            <a
              href='/signin'
              className='nav-link'
            >
              Sign in
            </a>
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className='mt-3'>
          <Outlet />
        </Container>
      </main>
      <footer className='pt-3'>
        <div className='text-center p-3'>All rigths reserved</div>
      </footer>
    </div>
  );
}

export default App;
