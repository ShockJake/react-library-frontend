import React, { useEffect, useState } from "react";
import { fetchPurchases } from "../services/communication";
import PurchaseItem from "./purchaseItem";
import { Purchase } from "../data/purchase";
import loadingLogo from "../star-fill.svg";

const PurchaseList: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadPurchases = async () => {
    try {
      const purchases = await fetchPurchases();
      setPurchases(purchases);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const clearPurchases = async () => {
    setPurchases([]);
    setLoading(true);
  };

  useEffect(() => {
    clearPurchases();
    loadPurchases();
  }, []);

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

  if (purchases.length === 0) {
    return (
      <div>
        <div className="fs-5 fw-semibold p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="25"
            fill="currentColor"
            className="bi bi-cart2"
            viewBox="0 0 20 22"
          >
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
          </svg>
          Purchases
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
          className="bi bi-cart2"
          viewBox="0 0 20 22"
        >
          <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
        </svg>
        Purchases:
      </div>
      <div className="row">
        {purchases.map((purchase) => (
          <PurchaseItem key={purchase.id} purchase={purchase} />
        ))}
      </div>
    </div>
  );
};

export default PurchaseList;
