import React from "react";
import Alert from "react-bootstrap/Alert";

interface ErrorProps {
  isActive: boolean;
  message: string;
}

const ErrorItem: React.FC<ErrorProps> = ({ isActive, message }) => {
  if (!isActive) {
    return <></>;
  }
  return (
    <Alert key="Alert" variant="danger" className="text-center">
      {message}
    </Alert>
  );
};

export default ErrorItem;
