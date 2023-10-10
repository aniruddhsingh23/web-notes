import { Alert } from "react-bootstrap";

import React from "react";

const ErrorHandler = ({ variant = "info", children }) => {
  return (
    <Alert variant={variant} style={{ fontSize: 20 }}>
      <strong>{children}</strong>
    </Alert>
  );
};

export default ErrorHandler;
