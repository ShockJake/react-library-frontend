import React from "react";
import { Purchase } from "../data/purchase";

interface PurchaseProps {
  purchase: Purchase;
}

const PurchaseItem: React.FC<PurchaseProps> = ({ purchase }) => (
  <div className="col-sm-6 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-bag-fill"
            viewBox="4 0 16 20"
          >
            <path
              fill-rule="evenodd"
              d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0m-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"
            />
          </svg>
          Purchase #{purchase.id}
        </h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">
          {purchase.date}
        </h6>
        <span>
          {purchase.books.map((book) => (
            <div key={book.title}>
              <span>
                <strong>{book.title}</strong> {book.author}
              </span>
            </div>
          ))}
        </span>
      </div>
    </div>
  </div>
);

export default PurchaseItem;
