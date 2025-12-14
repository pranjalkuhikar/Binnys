import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetMovieByIdQuery, useGetTvShowByIdQuery } from "../services/api";
import { useGetMovieByIdQuery as useGetAdminMovieByIdQuery } from "../services/admin";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

const MediaDetail = ({ mediaType }) => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isAdminMovie = searchParams.get("admin") === "true";

  const {
    data: movie,
    error: movieError,
    isLoading: movieIsLoading,
  } = useGetMovieByIdQuery(id, { skip: mediaType !== "movie" || isAdminMovie });

  const {
    data: adminMovie,
    error: adminMovieError,
    isLoading: adminMovieIsLoading,
  } = useGetAdminMovieByIdQuery(id, { skip: !isAdminMovie });

  const {
    data: tvShow,
    error: tvShowError,
    isLoading: tvShowIsLoading,
  } = useGetTvShowByIdQuery(id, { skip: mediaType !== "tvshow" });

  const isLoading =
    mediaType === "movie"
      ? isAdminMovie
        ? adminMovieIsLoading
        : movieIsLoading
      : tvShowIsLoading;
  const error =
    mediaType === "movie"
      ? isAdminMovie
        ? adminMovieError
        : movieError
      : tvShowError;
  const media =
    mediaType === "movie" ? (isAdminMovie ? adminMovie : movie) : tvShow;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!media) {
    return (
      <div
        className="text-center text-xl mt-8"
        style={{ color: "var(--color-primary-text)" }}
      >
        {mediaType} not found.
      </div>
    );
  }

  const defaultImageUrl = "https://via.placeholder.com/1280x720?text=No+Image"; // Default image for hero section

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--color-primary-bg)",
        color: "var(--color-primary-text)",
      }}
    >
      {/* Hero Section */}
      <div
        className="relative h-[40em] md:h-screen-50 lg:h-screen-75 flex items-end p-8  md:p-16 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.8) 100%), url(${
            media.poster || defaultImageUrl
          })`,
        }}
      >
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            {media.title}
          </h1>
          <p className="text-base md:text-lg text-gray-300 mb-4">
            {media.year} | {media.genres ? media.genres.join(", ") : "N/A"}
          </p>
          <p className="text-base leading-relaxed text-gray-200 mb-6 line-clamp-3 md:line-clamp-4">
            {media.plot}
          </p>
          <div className="flex space-x-4">
            <button className="bg-white text-black py-3 px-8 rounded-lg text-lg font-semibold hover:bg-gray-300 transition duration-300">
              ▶ Play
            </button>
            <button className="bg-gray-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-gray-700 transition duration-300">
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Additional Details Section */}
      <div className="container mx-auto p-8 md:p-16 pt-8 relative z-20">
        <div className="bg-gray-900 bg-opacity-70 rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-white">Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            {mediaType === "movie" && (
              <p>
                <strong className="font-semibold text-white">
                  IMDB Rating:
                </strong>{" "}
                {media.imdb ? media.imdb.rating : "N/A"}
              </p>
            )}
            <p>
              <strong className="font-semibold text-white">Status:</strong>{" "}
              {media.status || "N/A"}
            </p>
            <p>
              <strong className="font-semibold text-white">Language:</strong>{" "}
              {media.language || "N/A"}
            </p>
            <p>
              <strong className="font-semibold text-white">Rating:</strong>{" "}
              {media.imdb ? media.imdb.rating : "N/A"}
            </p>
            <p>
              <strong className="font-semibold text-white">Runtime:</strong>{" "}
              {media.runtime ? `${media.runtime} minutes` : "N/A"}
            </p>
            <p>
              <strong className="font-semibold text-white">Network:</strong>{" "}
              {media.network || "N/A"}
            </p>
            <p>
              <strong className="font-semibold text-white">
                Official Site:
              </strong>{" "}
              {media.officialSite ? (
                <a
                  href={media.officialSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {media.officialSite}
                </a>
              ) : (
                "N/A"
              )}
            </p>
          </div>

          {media.cast && media.cast.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4 text-white">Cast</h3>
              <div className="flex flex-wrap gap-4">
                {media.cast.map((person, index) => (
                  <span
                    key={index}
                    className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {person}
                  </span>
                ))}
              </div>
            </div>
          )}

          {mediaType === "movie" && media.director && (
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4 text-white">Director</h3>
              <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
                {media.director}
              </span>
            </div>
          )}

          {mediaType === "tvshow" &&
            media.seasons &&
            media.seasons.length > 0 && (
              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4 text-white">Seasons</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {media.seasons.map((season) => (
                    <div key={season.id} className="bg-gray-800 p-4 rounded-lg">
                      <p className="text-lg font-semibold text-white">
                        Season {season.number}
                      </p>
                      <p className="text-gray-400">
                        Episodes: {season.episodeOrder || "N/A"}
                      </p>
                      <p className="text-gray-400">
                        Premiered: {season.premiereDate || "N/A"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default MediaDetail;
