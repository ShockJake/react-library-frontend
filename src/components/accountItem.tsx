import React from "react";
import "../App.css";
import "./account/unauthenticatedItem";
import UnauthenticatedItem from "./account/unauthenticatedItem";

const AccountItem: React.FC = () => {
  const isTokenSet = localStorage.getItem("auth-token") !== null;

  if (!isTokenSet) {
    return <UnauthenticatedItem key="unauth-item" />;
  }

  return (
    <div
      className="collapse navbar-collapse justify-content-end text-end"
      id="navbarSupportedContent"
    >
      <div className="d-flex justify-content-end text-end">
        <a className="btn btn-primary " href="/purchases">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="25"
            fill="currentColor"
            className="bi bi-cart2"
            viewBox="0 0 20 21"
          >
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
          </svg>
          Purchases
        </a>
      </div>
      <div className="d-flex justify-content-end text-end ms-1">
        <a className="btn btn-success " href="/cart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="25"
            fill="currentColor"
            className="bi bi-bag-fill"
            viewBox="0 0 20 21"
          >
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4z" />
          </svg>
          Cart
        </a>
      </div>
    </div>
  );
};

export default AccountItem;
