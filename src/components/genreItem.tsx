import React, { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import "../App.css";

interface GenreItemProps {
  genre: string;
  currentActiveCell: string;
  activateCell: Dispatch<SetStateAction<string>>;
}

const GenreItem: React.FC<GenreItemProps> = ({
  genre,
  currentActiveCell,
  activateCell,
}) => {
  let backgroundColorClass = "";
  let textColor = "#212529";

  if (genre === currentActiveCell) {
    backgroundColorClass = "active";
    textColor = "white";
  }

  return (
    <Link
      className={
        "text-decoration-none list-group-item list-group-item-action py-3 lh-sm " +
        backgroundColorClass
      }
      aria-current="true"
      to={"/books/" + genre}
      onClick={() => activateCell(genre)}
    >
      <div
        className="d-flex w-100 align-items-center justify-content-between"
        style={{ color: textColor }}
      >
        <strong className="mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            fill="currentColor"
            className="bi bi-circle-fill"
            viewBox="2 0 20 25"
          >
            <circle cx="8" cy="8" r="8" />
          </svg>
          {genre}
        </strong>
      </div>
    </Link>
  );
};

export default GenreItem;
