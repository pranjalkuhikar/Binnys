import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetTvShowsQuery,
  useGetUniqueTvShowGenresQuery,
} from "../services/api";
import TvShowCard from "./TvShowCard";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

const TvShowList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState("asc"); // Default order ascending
  const [selectedGenre, setSelectedGenre] = useState("");

  const { data, error, isLoading } = useGetTvShowsQuery({
    page: currentPage,
    limit: 20,
    order,
    genre: selectedGenre, // Pass selected genre to the query
  });

  const { data: genresData } = useGetUniqueTvShowGenresQuery();
  console.log("genresData:", genresData);
  const genres = genresData || [];

  const tvShows = data?.tvShows || [];
  const totalPages = data?.totalPages || 1;

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
    setCurrentPage(1); // Reset to first page on order change
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    setCurrentPage(1); // Reset to first page on genre change
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1
        className="text-4xl font-bold mb-8 text-center"
        style={{ color: "var(--color-primary-text)" }}
      >
        TV Show List
      </h1>

      <div className="flex justify-center mb-6 space-x-4">
        <select
          value={order}
          onChange={handleOrderChange}
          className="p-2 rounded-md bg-gray-800 text-white border border-gray-700"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <select
          value={selectedGenre}
          onChange={handleGenreChange}
          className="p-2 rounded-md bg-gray-800 text-white border border-gray-700"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {tvShows.map((show) => (
          <TvShowCard key={show._id} tvShow={show} />
        ))}
      </ul>
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="py-2 px-4 rounded disabled:opacity-50 transition duration-300"
          style={{
            backgroundColor: "var(--color-secondary-bg)",
            color: "var(--color-primary-text)",
          }}
          aria-label="Previous Page"
        >
          Previous
        </button>
        <span
          className="text-xl font-semibold"
          style={{ color: "var(--color-primary-text)" }}
        >
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="py-2 px-4 rounded disabled:opacity-50 transition duration-300"
          style={{
            backgroundColor: "var(--color-secondary-bg)",
            color: "var(--color-primary-text)",
          }}
          aria-label="Next Page"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TvShowList;
