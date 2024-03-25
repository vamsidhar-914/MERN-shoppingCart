import { ReactNode } from 'react';
import { Alert } from 'react-bootstrap';

type PropTypes = {
  variant?: string;
  children: ReactNode;
};

const MessageBox = ({ variant = 'info', children }: PropTypes) => {
  return <Alert variant={variant || 'info'}>{children}</Alert>;
};

export default MessageBox;
