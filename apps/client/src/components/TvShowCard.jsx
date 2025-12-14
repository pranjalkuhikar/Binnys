import React, { useState } from "react";
import { Link } from "react-router-dom";

const TvShowCard = ({ tvShow }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-110 hover:z-20 group aspect-w-2 aspect-h-3"
      style={{ backgroundColor: "var(--color-secondary-bg)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/tvshows/${tvShow._id}`} className="block w-full h-full">
        {/* TV Show Poster/Image */}
        {tvShow.poster ? (
          <img
            src={tvShow.poster}
            alt={tvShow.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-700 to-gray-900"
            style={{ color: "var(--color-secondary-text)" }}
          >
            <div className="text-center p-4">
              <div className="text-5xl mb-3 opacity-60">📺</div>
              <div className="text-sm font-medium">No Image Available</div>
              <div className="text-xs opacity-75 mt-1">{tvShow.title}</div>
            </div>
          </div>
        )}

        {/* Linear Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Netflix-style Info Overlay */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black via-black/90 to-transparent transform transition-all duration-300 ${
            isHovered
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }`}
        >
          {/* Title */}
          <h3 className="text-white font-bold text-sm mb-2 line-clamp-2 leading-tight">
            {tvShow.title}
          </h3>

          {/* Meta Info */}
          <div className="flex items-center gap-2 mb-3 text-xs text-gray-300">
            <span className="text-green-400 font-semibold">
              {tvShow.imdb?.rating ? `${tvShow.imdb.rating * 10}%` : "N/A"}{" "}
              Match
            </span>
            <span>•</span>
            <span>{tvShow.year}</span>
          </div>

          {/* Genres */}
          {tvShow.genres && tvShow.genres.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {tvShow.genres.slice(0, 3).map((genre, index) => (
                <span
                  key={index}
                  className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-white/30"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          {/* Quality Badge */}
          <div className="flex items-center justify-between mb-3">
            <span className="bg-linear-to-r from-purple-600 to-pink-600 text-white text-xs px-2 py-1 rounded font-semibold">
              HD
            </span>
            <div className="flex items-center gap-1 text-yellow-400">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 7.302A1 1 0 003.462 5.61h3.462a1 1 0 00.95-.69L9.049 2.927z" />
              </svg>
              <span className="text-xs font-semibold">
                {tvShow.imdb?.rating || "N/A"}
              </span>
            </div>
          </div>

          {/* Play Button */}
          <button className="w-full bg-white text-black py-2 rounded-md text-sm font-bold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2 group-hover:scale-105">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            Play
          </button>
        </div>

        {/* Netflix-style Play Button on Center Hover */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-2xl transform group-hover:scale-110 transition-transform duration-200">
            <svg
              className="w-8 h-8 text-black"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TvShowCard;
