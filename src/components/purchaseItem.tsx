import React from "react";
import { Purchase } from "../data/purchase";

interface PurchaseProps {
  purchase: Purchase;
}

const PurchaseItem: React.FC<PurchaseProps> = ({ purchase }) => (
  <div className="col-sm-6 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Purchase #{purchase.id}</h5>
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
