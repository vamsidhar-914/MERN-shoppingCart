import { Col, Row } from 'react-bootstrap';

type propsType = {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
};

export default function Checkout(props: propsType) {
  return (
    <Row className='checkout-steps'>
      <Col className={props.step1 ? 'active' : ''}>Sign-In</Col>
      <Col className={props.step2 ? 'active' : ''}>Shipping</Col>
      <Col className={props.step3 ? 'active' : ''}>Payment</Col>
      <Col className={props.step4 ? 'active' : ''}>place Order</Col>
    </Row>
  );
}
