import React, { useEffect, useState } from "react";
import { fetchGenres } from "../services/communication";
import GenreItem from "./genreItem";
import loadingLogo from "../gear-fill.svg";
import "../App.css";

const GenreList: React.FC = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCellName, setActiveCellName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genres = await fetchGenres();
        setGenres(genres);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadGenres();
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

  return (
    <div className="genre-list">
      {genres.map((genre) => (
        <GenreItem
          key={genre}
          genre={genre}
          currentActiveCell={activeCellName}
          activateCell={setActiveCellName}
        />
      ))}
    </div>
  );
};

export default GenreList;
