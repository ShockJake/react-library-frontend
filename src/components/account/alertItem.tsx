import React from "react";
import Alert from "react-bootstrap/Alert";

interface AlertProps {
  isActive: boolean;
  message: string;
}

const AlertItem: React.FC<AlertProps> = ({ isActive, message }) => {
  if (!isActive) {
    return <></>;
  }
  return (
    <Alert key="alert_item" variant="success" className="text-center">
      {message}
    </Alert>
  );
};

export default AlertItem;
