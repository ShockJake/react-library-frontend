import React, { useEffect, useState } from "react";
import { fetchBooksByGenre } from "../services/communication";
import BookItem from "./bookItem";
import { Book } from "../data/book";
import { useParams } from "react-router-dom";
import "../App.css";
import loadingLogo from "../star-fill.svg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { genre } = useParams();
  const [showBuyModal, setShowBuyModal] = useState<boolean>(false);
  const [showCartModal, setShowCartModal] = useState<boolean>(false);
  const [boughtBookTitle, setBoughtBookTitle] = useState<string>("");

  const loadBooks = async () => {
    try {
      const books = await fetchBooksByGenre(genre as string);
      setBooks(books);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const clearBooks = async () => {
    setBooks([]);
    setLoading(true);
  };

  useEffect(() => {
    clearBooks();
    loadBooks();
  }, [genre]);

  if (loading)
    return (
      <p>
        Loading{" "}
        <img
          src={loadingLogo}
          className="App-logo"
          alt="logo"
          width={20}
          height={20}
        />
      </p>
    );
  if (error) return <p>Error: {error}</p>;

  const handleShowBuyModal = () => setShowBuyModal(true);
  const handleCloseBuyModal = () => setShowBuyModal(false);
  const handleShowCartModal = () => setShowCartModal(true);
  const handleCloseCartModal = () => setShowCartModal(false);

  return (
    <div>
      <div className="fs-5 fw-semibold p-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 20 20"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
        Search results
      </div>
      <div className="row">
        {books.map((book) => (
          <BookItem
            key={book.title}
            book={book}
            handleShowBuyModal={handleShowBuyModal}
            handleShowCartModal={handleShowCartModal}
            setBoughtBookTitle={setBoughtBookTitle}
          />
        ))}
      </div>
      <Modal show={showBuyModal} onHide={handleCloseBuyModal}>
        <Modal.Header closeButton>
          <Modal.Title>Book has been bought!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have successfully bought a book: {boughtBookTitle}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseBuyModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showCartModal} onHide={handleCloseCartModal}>
        <Modal.Header closeButton>
          <Modal.Title>Book has been added to cart!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have successfully added <strong>{boughtBookTitle}</strong> to
          cart.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCartModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookList;
