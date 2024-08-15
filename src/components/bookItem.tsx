import React, { Dispatch, SetStateAction } from "react";
import { Book } from "../data/book";
import "../App.css";
import { buyBooks, addBookToCart } from "../services/communication";

interface BookProps {
  book: Book;
  handleShowBuyModal: () => void;
  handleShowCartModal: () => void;
  setBoughtBookTitle: Dispatch<SetStateAction<string>>;
}

interface AmazonLinkProps {
  amazonId: string | null;
}

function handleBuy(book: Book) {
  const books = [];
  books.push(book);
  buyBooks(books);
}

function handleAddToCart(book: Book) {
  addBookToCart(book);
}

const AmazonLinkItem: React.FC<AmazonLinkProps> = ({ amazonId }) => {
  if (amazonId) {
    return (
      <a
        className="btn btn-primary ms-1"
        href={"https://www.amazon.com/dp/" + amazonId}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-amazon"
          viewBox="4 0 16 20"
        >
          <path d="M10.813 11.968c.157.083.36.074.5-.05l.005.005a90 90 0 0 1 1.623-1.405c.173-.143.143-.372.006-.563l-.125-.17c-.345-.465-.673-.906-.673-1.791v-3.3l.001-.335c.008-1.265.014-2.421-.933-3.305C10.404.274 9.06 0 8.03 0 6.017 0 3.77.75 3.296 3.24c-.047.264.143.404.316.443l2.054.22c.19-.009.33-.196.366-.387.176-.857.896-1.271 1.703-1.271.435 0 .929.16 1.188.55.264.39.26.91.257 1.376v.432q-.3.033-.621.065c-1.113.114-2.397.246-3.36.67C3.873 5.91 2.94 7.08 2.94 8.798c0 2.2 1.387 3.298 3.168 3.298 1.506 0 2.328-.354 3.489-1.54l.167.246c.274.405.456.675 1.047 1.166ZM6.03 8.431C6.03 6.627 7.647 6.3 9.177 6.3v.57c.001.776.002 1.434-.396 2.133-.336.595-.87.961-1.465.961-.812 0-1.286-.619-1.286-1.533M.435 12.174c2.629 1.603 6.698 4.084 13.183.997.28-.116.475.078.199.431C13.538 13.96 11.312 16 7.57 16 3.832 16 .968 13.446.094 12.386c-.24-.275.036-.4.199-.299z" />
          <path d="M13.828 11.943c.567-.07 1.468-.027 1.645.204.135.176-.004.966-.233 1.533-.23.563-.572.961-.762 1.115s-.333.094-.23-.137c.105-.23.684-1.663.455-1.963-.213-.278-1.177-.177-1.625-.13l-.09.009q-.142.013-.233.024c-.193.021-.245.027-.274-.032-.074-.209.779-.556 1.347-.623" />
        </svg>
        Amazon
      </a>
    );
  }
  return <div></div>;
};

const BookItem: React.FC<BookProps> = ({
  book,
  handleShowBuyModal,
  handleShowCartModal,
  setBoughtBookTitle,
}) => (
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
          className="btn btn-outline-primary"
          onClick={() => {
            handleBuy(book);
            setBoughtBookTitle(book.title);
            handleShowBuyModal();
          }}
        >
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
          Buy
        </button>
        <button
          className="btn btn-outline-success ms-1"
          onClick={() => {
            handleAddToCart(book);
            setBoughtBookTitle(book.title);
            handleShowCartModal();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-bag-fill"
            viewBox="4 0 16 20"
          >
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4z" />
          </svg>
          Add to cart
        </button>
        <AmazonLinkItem key={book.title} amazonId={book.amazonBookId} />
      </div>
    </div>
  </div>
);

export default BookItem;
