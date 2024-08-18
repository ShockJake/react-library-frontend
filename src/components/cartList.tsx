import React, { useEffect, useState } from "react";
import { Book } from "../data/book";
import { getCart, clearCart, checkoutCart } from "../services/communication";
import loadingLogo from "../gear-fill.svg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CartItem from "./cartItem";

const CartList: React.FC = () => {
  const [cartItems, setCartItems] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [changed, setChanged] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const loadBooksInCart = async () => {
    try {
      const books = await getCart();
      setCartItems(books);
      setError(null);
      setChanged(false);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const clearBooksInChart = async () => {
    setCartItems([]);
    setLoading(true);
  };

  useEffect(() => {
    clearBooksInChart();
    loadBooksInCart();
  }, [changed]);

  const handleShowConfirmModal = () => setShowConfirmModal(true);
  const handleCloseConfirmModal = () => setShowConfirmModal(false);
  const handleClearCart = async () => {
    await clearCart();
    setChanged(true);
  };
  const handleConfirm = async () => {
    await checkoutCart();
    handleCloseConfirmModal();
    setChanged(true);
  };

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

  if (cartItems.length === 0) {
    return (
      <div>
        <div className="fs-5 fw-semibold p-3">
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
          Your cart
        </div>
        <div className="mt-5 pt-5">Nothing to show...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="fs-5 fw-semibold p-3">
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
        Your cart
      </div>
      <div className="row">
        {cartItems.map((item) => (
          <CartItem key={item.title} book={item} setChanged={setChanged} />
        ))}
      </div>
      <Button variant="secondary" onClick={handleClearCart}>
        Clear
      </Button>
      <Button
        variant="primary"
        className="ms-1"
        onClick={handleShowConfirmModal}
      >
        Checkout
      </Button>
      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to checkout?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseConfirmModal}>
            Not now
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CartList;
