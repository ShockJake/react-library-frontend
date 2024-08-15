import React, { Dispatch, SetStateAction } from "react";
import { Book } from "../data/book";
import { removeBookFromCart } from "../services/communication";

interface CartItemProps {
  book: Book;
  setChanged: Dispatch<SetStateAction<boolean>>;
}

function handleRemoveFromCart(book: Book) {
  removeBookFromCart(book);
}

const CartItem: React.FC<CartItemProps> = ({ book, setChanged }) => (
  <div className="col-sm-4 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">
          {book.author}
        </h6>
        <span>{book.firstPublishedDate}</span>
        <p></p>
        <button
          className="btn btn-outline-danger ms-1 justify-content-end"
          onClick={() => {
            handleRemoveFromCart(book);
            setChanged(true);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  </div>
);

export default CartItem;
