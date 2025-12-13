import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/movies/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div>Loading movie details...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  const defaultImageUrl = "https://via.placeholder.com/150"; // Default image if poster is not available

  return (
    <div className="movie-detail-container">
      <h2>{movie.title}</h2>
      <img
        src={movie.poster || defaultImageUrl}
        alt={movie.title}
        className="movie-poster"
      />
      <p>
        <strong>Plot:</strong> {movie.plot}
      </p>
      <p>
        <strong>Genre:</strong> {movie.genres ? movie.genres.join(", ") : "N/A"}
      </p>
      <p>
        <strong>Cast:</strong> {movie.cast ? movie.cast.join(", ") : "N/A"}
      </p>
      <p>
        <strong>Director:</strong> {movie.director || "N/A"}
      </p>
      <p>
        <strong>Year:</strong> {movie.year || "N/A"}
      </p>
      <p>
        <strong>IMDB Rating:</strong> {movie.imdb ? movie.imdb.rating : "N/A"}
      </p>
      {/* Add more movie details as needed */}
    </div>
  );
};

export default MovieDetail;
