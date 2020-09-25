import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div>
      <Spinner
        variant="primary"
        animation="border"
        style={{ position: 'fixed', top: '50%', left: '50%' }}
      />
    </div>
  );
};

export default Loader;
