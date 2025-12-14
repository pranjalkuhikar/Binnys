import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetMoviesQuery, useGetTvShowsQuery } from "../services/api";
import { useGetMoviesQuery as useGetAdminMoviesQuery } from "../services/admin";
import MovieCard from "./MovieCard"; // Assuming you have a MovieCard component
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const {
    data: heroMoviesData,
    error: heroError,
    isLoading: heroLoading,
  } = useGetMoviesQuery({ page: 1, limit: 5 });
  const {
    data: featuredMoviesData,
    error: featuredMoviesError,
    isLoading: featuredMoviesLoading,
  } = useGetMoviesQuery({ page: 1, limit: 10, isFeatured: true });
  const {
    data: adminMovies,
    isLoading: adminMoviesLoading,
    error: adminMoviesError,
  } = useGetAdminMoviesQuery();
  const {
    data: allMoviesData,
    error: allMoviesError,
    isLoading: allMoviesLoading,
  } = useGetMoviesQuery({ page: 1, limit: 18 }); // Fetch more movies for the general list
  const {
    data: searchResultsDataMovies,
    error: searchErrorMovies,
    isLoading: searchLoadingMovies,
  } = useGetMoviesQuery(
    { page: 1, limit: 10, search: debouncedSearchTerm },
    { skip: !debouncedSearchTerm }
  );

  const {
    data: searchResultsDataTvShows,
    error: searchErrorTvShows,
    isLoading: searchLoadingTvShows,
  } = useGetTvShowsQuery(
    { page: 1, limit: 10, search: debouncedSearchTerm },
    { skip: !debouncedSearchTerm }
  );

  const heroMovies = React.useMemo(
    () => heroMoviesData?.movies || [],
    [heroMoviesData]
  );
  const featuredMovies = React.useMemo(
    () => featuredMoviesData?.movies || [],
    [featuredMoviesData]
  );
  const allMovies = React.useMemo(
    () => allMoviesData?.movies || [],
    [allMoviesData]
  );

  const searchResults = React.useMemo(() => {
    const movies = searchResultsDataMovies?.movies || [];
    const tvShows = searchResultsDataTvShows?.tvShows || [];
    return [...movies, ...tvShows];
  }, [searchResultsDataMovies, searchResultsDataTvShows]);

  const searchLoading = searchLoadingMovies || searchLoadingTvShows;
  const searchError = searchErrorMovies || searchErrorTvShows;

  useEffect(() => {
    if (heroMovies.length > 1 && !debouncedSearchTerm) {
      const timer = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % heroMovies.length);
      }, 5000); // Change slide every 5 seconds
      return () => clearInterval(timer);
    }
  }, [heroMovies, debouncedSearchTerm]);

  const handlePrevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + heroMovies.length) % heroMovies.length
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % heroMovies.length);
  };

  const defaultHeroImageUrl =
    "https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-236105299.jpg";

  if (heroLoading && !searchTerm) {
    return <LoadingSpinner />;
  }

  if (heroError && !searchTerm) {
    return <ErrorMessage message={heroError.message} />;
  }

  const currentHeroMovie = heroMovies[currentSlide];

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--color-primary-bg)",
        color: "var(--color-primary-text)",
      }}
    >
      {/* Search Bar */}
      <div className="p-4 flex justify-center absolute px-4 py-10 w-80 md:w-[50em] top-10 left-10 md:left-1/4 z-50">
        <input
          type="text"
          placeholder="Search for movies or TV shows..."
          className="w-full max-w-2xl p-4 rounded-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500 text-lg shadow-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            className="ml-2 p-3 rounded-full bg-gray-700 text-white focus:outline-none hover:bg-gray-600"
            onClick={() => setSearchTerm("")}
          >
            Clear
          </button>
        )}

        {debouncedSearchTerm && (
          <div className="absolute top-full mt-2 w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg p-4 max-h-96 overflow-y-auto z-50">
            <h2 className="text-xl font-bold mb-4 text-white">
              Search Results
            </h2>
            {searchLoading && <LoadingSpinner />}
            {searchError && <ErrorMessage message={searchError.message} />}
            {searchResults.length > 0 ? (
              <ul className="grid grid-cols-1 gap-4">
                {searchResults.map((item) => (
                  <Link
                    to={
                      item.type === "movie"
                        ? `/movies/${item._id}`
                        : `/tvshows/${item._id}`
                    }
                    key={item._id}
                    className="flex items-center p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                    onClick={() => setSearchTerm("")}
                  >
                    <img
                      src={
                        item.poster ||
                        "https://via.placeholder.com/50x75?text=No+Image"
                      }
                      alt={item.title}
                      className="w-12 h-18 object-cover rounded mr-4"
                    />
                    <div>
                      <p className="text-white font-semibold">{item.title}</p>
                      <p className="text-gray-400 text-sm">
                        {item.year} (
                        {item.type === "movie" ? "Movie" : "TV Show"})
                      </p>
                    </div>
                  </Link>
                ))}
              </ul>
            ) : (
              !searchLoading && (
                <div className="text-center text-white">
                  No results found for "{debouncedSearchTerm}"
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Hero Section - Netflix Style */}
      {currentHeroMovie && (
        <div
          className="relative h-[80vh] flex items-end bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `linear-gradient(77deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 35%, rgba(0,0,0,0) 100%), linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.9) 100%), url(${currentHeroMovie.poster || defaultHeroImageUrl})`,
          }}
        >
          <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent"></div>
          <div className="relative z-10 max-w-3xl px-4 md:px-8 pb-16 md:pb-24">
            <div className="transform transition-all duration-700 ease-out">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white leading-tight drop-shadow-2xl">
                {currentHeroMovie.title}
              </h1>
              <div className="flex items-center gap-4 mb-4 text-gray-300">
                <span className="text-green-400 font-semibold">98% Match</span>
                <span>{currentHeroMovie.year}</span>
                {currentHeroMovie.runtime && (
                  <span>{currentHeroMovie.runtime} min</span>
                )}
                {currentHeroMovie.genres &&
                  currentHeroMovie.genres.length > 0 && (
                    <span className="border border-gray-400 px-2 py-1 text-xs rounded">
                      {currentHeroMovie.genres[0]}
                    </span>
                  )}
              </div>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-200 mb-8 max-w-2xl line-clamp-3 drop-shadow-lg">
                {currentHeroMovie.plot}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to={`/movies/${currentHeroMovie._id}`}>
                  <button className="bg-white text-black px-6 md:px-8 py-3 rounded-md text-base md:text-lg font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105">
                    <span className="text-xl">▶</span>
                    Play
                  </button>
                </Link>
                <Link to={`/movies/${currentHeroMovie._id}`}>
                  <button className="bg-gray-600/70 backdrop-blur-sm text-white px-6 md:px-8 py-3 rounded-md text-base md:text-lg font-semibold hover:bg-gray-500/70 transition-all duration-200 flex items-center gap-2 border border-gray-500 shadow-lg hover:shadow-xl transform hover:scale-105">
                    <span className="text-xl">ⓘ</span>
                    More Info
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Slider Controls */}
          {heroMovies.length > 1 && (
            <>
              <button
                onClick={handlePrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full focus:outline-none transition-all duration-300 backdrop-blur-sm shadow-lg"
                aria-label="Previous slide"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={handleNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full focus:outline-none transition-all duration-300 backdrop-blur-sm shadow-lg"
                aria-label="Next slide"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
                {heroMovies.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-1 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-white w-6"
                        : "bg-white/40 hover:bg-white/60"
                    } focus:outline-none`}
                    aria-label={`Go to slide ${index + 1}`}
                  ></button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
      {/* Features Movies */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-white px-4">
          Featured Movies
        </h2>
        {featuredMoviesLoading && <LoadingSpinner />}
        {featuredMoviesError && (
          <ErrorMessage message={featuredMoviesError.message} />
        )}
        {featuredMovies?.length > 0 && (
          <div className="px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {featuredMovies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Admin Movies Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-white px-4">
          Admin Movies
        </h2>
        {adminMoviesLoading && <LoadingSpinner />}
        {adminMoviesError && (
          <ErrorMessage message={adminMoviesError.message} />
        )}
        {adminMovies?.length > 0 && (
          <div className="px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {adminMovies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} isAdminMovie={true} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trending Now */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-white px-4">
          Trending Now
        </h2>
        {allMoviesLoading && <LoadingSpinner />}
        {allMoviesError && <ErrorMessage message={allMoviesError.message} />}
        {allMovies.length > 0 && (
          <div className="px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {allMovies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
