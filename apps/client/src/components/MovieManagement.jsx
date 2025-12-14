import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

const MovieManagement = () => {
  const location = useLocation();
  const movieToEditRef = useRef(null);
  const [movies, setMovies] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    plot: "",
    genres: "",
    runtime: "",
    rated: "",
    cast: "",
    directors: "",
    writers: "",
    year: "",
    poster: "",
    isFeatured: false,
    imdbRating: "",
    language: "",
    officialSite: "",
    status: "",
    rating: "",
    network: "",
  });
  const [editingMovieId, setEditingMovieId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle movie editing from AdminHome
  const initializeEditMovie = (movie) => {
    setEditingMovieId(movie._id);
    setFormData({
      title: movie.title || "",
      plot: movie.plot || "",
      genres: movie.genres ? movie.genres.join(", ") : "",
      runtime: movie.runtime || "",
      rated: movie.rated || "",
      cast: movie.cast ? movie.cast.join(", ") : "",
      directors: movie.directors ? movie.directors.join(", ") : "",
      writers: movie.writers ? movie.writers.join(", ") : "",
      year: movie.year || "",
      poster: movie.poster || "",
      isFeatured: movie.isFeatured || false,
      imdbRating: movie.imdbRating || "",
      language: movie.language || "",
      officialSite: movie.officialSite || "",
      status: movie.status || "",
      rating: movie.rating || "",
      network: movie.network || "",
    });
  };

  useEffect(() => {
    const fetchAdminMovies = async () => {
      setLoading(true);
      try {
        // Fetch only movies created by the admin
        const response = await axios.get(
          "http://localhost:3000/api/admin/movies",
          {
            withCredentials: true,
          }
        );
        setMovies(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch admin movies");
      } finally {
        setLoading(false);
      }
    };
    fetchAdminMovies();
  }, []);

  // Handle movie to edit from AdminHome
  useEffect(() => {
    if (location.state?.movieToEdit) {
      movieToEditRef.current = location.state.movieToEdit;
    }
  }, [location.state]);

  // Initialize form when movie to edit is available
  useEffect(() => {
    if (movieToEditRef.current) {
      initializeEditMovie(movieToEditRef.current);
      movieToEditRef.current = null; // Clear after use
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const movieData = {
      ...formData,
      genres: formData.genres.split(",").map((g) => g.trim()),
      cast: formData.cast.split(",").map((c) => c.trim()),
      directors: formData.directors.split(",").map((d) => d.trim()),
      writers: formData.writers.split(",").map((w) => w.trim()),
      runtime: parseInt(formData.runtime),
      year: parseInt(formData.year),
      imdbRating: parseFloat(formData.imdbRating) || null,
    };

    try {
      if (editingMovieId) {
        await axios.put(
          `http://localhost:3000/api/admin/movies/${editingMovieId}`,
          movieData,
          { withCredentials: true }
        );
        setSuccess("Movie updated successfully!");
      } else {
        await axios.post("http://localhost:3000/api/admin/movies", movieData, {
          withCredentials: true,
        });
        setSuccess("Movie added successfully!");
      }
      setFormData({
        title: "",
        plot: "",
        genres: "",
        runtime: "",
        rated: "",
        cast: "",
        directors: "",
        writers: "",
        year: "",
        poster: "",
        isFeatured: false,
        imdbRating: "",
        language: "",
        officialSite: "",
        status: "",
        rating: "",
        network: "",
      });
      setEditingMovieId(null);
      const response = await axios.get(
        "http://localhost:3000/api/admin/movies",
        {
          withCredentials: true,
        }
      );
      setMovies(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (movie) => {
    setEditingMovieId(movie._id);
    setFormData({
      title: movie.title || "",
      plot: movie.plot || "",
      genres: movie.genres ? movie.genres.join(", ") : "",
      runtime: movie.runtime || "",
      rated: movie.rated || "",
      cast: movie.cast ? movie.cast.join(", ") : "",
      directors: movie.directors ? movie.directors.join(", ") : "",
      writers: movie.writers ? movie.writers.join(", ") : "",
      year: movie.year || "",
      poster: movie.poster || "",
      isFeatured: movie.isFeatured || false,
      imdbRating: movie.imdbRating || "",
      language: movie.language || "",
      officialSite: movie.officialSite || "",
      status: movie.status || "",
      rating: movie.rating || "",
      network: movie.network || "",
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:3000/api/admin/movies/${id}`, {
          withCredentials: true,
        });
        setSuccess("Movie deleted successfully!");
        const response = await axios.get(
          "http://localhost:3000/api/admin/movies",
          {
            withCredentials: true,
          }
        );
        setMovies(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete movie");
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
            Movie Management
          </h1>
          <p className="text-gray-400">
            Create and manage your movie collection
          </p>
        </div>

        {/* Alert Messages */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
            <p className="text-red-300">{error}</p>
          </div>
        )}
        {success && (
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-6">
            <p className="text-green-300">{success}</p>
          </div>
        )}

        {/* Movie Form */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 mb-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {editingMovieId ? "✏️ Edit Movie" : "➕ Add New Movie"}
            </h2>
            {editingMovieId && (
              <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm">
                Editing Mode
              </span>
            )}
          </div>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label
                className="block text-sm font-semibold mb-2 text-gray-300"
                htmlFor="title"
              >
                🎬 Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                placeholder="Enter movie title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2" htmlFor="plot">
                Plot:
              </label>
              <textarea
                id="plot"
                name="plot"
                value={formData.plot}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                rows="3"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2" htmlFor="genres">
                Genres (comma-separated):
              </label>
              <input
                type="text"
                id="genres"
                name="genres"
                value={formData.genres}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2" htmlFor="runtime">
                Runtime (minutes):
              </label>
              <input
                type="number"
                id="runtime"
                name="runtime"
                value={formData.runtime}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2" htmlFor="rated">
                Rated:
              </label>
              <input
                type="text"
                id="rated"
                name="rated"
                value={formData.rated}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2" htmlFor="cast">
                Cast (comma-separated):
              </label>
              <input
                type="text"
                id="cast"
                name="cast"
                value={formData.cast}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="directors"
              >
                Directors (comma-separated):
              </label>
              <input
                type="text"
                id="directors"
                name="directors"
                value={formData.directors}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2" htmlFor="writers">
                Writers (comma-separated):
              </label>
              <input
                type="text"
                id="writers"
                name="writers"
                value={formData.writers}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2" htmlFor="year">
                Year:
              </label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="imdbRating"
              >
                IMDB Rating:
              </label>
              <input
                type="text"
                id="imdbRating"
                name="imdbRating"
                value={formData.imdbRating}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="language"
              >
                Language:
              </label>
              <input
                type="text"
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="officialSite"
              >
                Official Site:
              </label>
              <input
                type="text"
                id="officialSite"
                name="officialSite"
                value={formData.officialSite}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2" htmlFor="status">
                Status:
              </label>
              <input
                type="text"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2" htmlFor="rating">
                Rating:
              </label>
              <input
                type="text"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2" htmlFor="network">
                Network:
              </label>
              <input
                type="text"
                id="network"
                name="network"
                value={formData.network}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2" htmlFor="poster">
                Poster URL:
              </label>
              <input
                type="text"
                id="poster"
                name="poster"
                value={formData.poster}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
              />
            </div>
            <div className="md:col-span-2 flex items-center">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="mr-2 h-5 w-5 text-blue-600 bg-gray-700 rounded border-gray-600 focus:ring-blue-500"
              />
              <label
                className="text-sm font-bold text-gray-300"
                htmlFor="isFeatured"
              >
                Featured Movie
              </label>
            </div>
            <div className="md:col-span-2 flex justify-end space-x-3">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                {editingMovieId ? "Update Movie" : "Add Movie"}
              </button>
              {editingMovieId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingMovieId(null);
                    setFormData({
                      title: "",
                      plot: "",
                      genres: "",
                      runtime: "",
                      rated: "",
                      cast: "",
                      directors: "",
                      writers: "",
                      year: "",
                      poster: "",
                      isFeatured: false,
                      imdbRating: "",
                      language: "",
                      officialSite: "",
                      status: "",
                      rating: "",
                      network: "",
                    });
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-5 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Movies Grid */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">🎭 Your Movies</h2>
            <div className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm">
              {movies.length} {movies.length === 1 ? "Movie" : "Movies"}
            </div>
          </div>

          {movies.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="xl font-semibold text-gray-400 mb-2">
                No movies yet
              </h3>
              <p className="text-gray-500">
                Start by adding your first movie using the form above!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {movies.map((movie) => (
                <div
                  key={movie._id}
                  className="bg-gray-700/50 backdrop-blur-sm rounded-xl border border-gray-600/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 group"
                >
                  <div className="aspect-2/3 relative overflow-hidden">
                    <img
                      src={
                        movie.poster ||
                        "https://via.placeholder.com/300x450/374151/9CA3AF?text=No+Poster"
                      }
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {movie.isFeatured && (
                      <div className="absolute top-2 right-2 bg-yellow-500/90 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                        ⭐ Featured
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">
                      {movie.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">{movie.year}</p>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                      {movie.plot?.substring(0, 80)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(movie)}
                          className="bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 font-medium py-2 px-3 rounded-lg text-sm transition-all duration-200 flex items-center space-x-1"
                        >
                          <span>✏️</span>
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(movie._id)}
                          className="bg-red-500/20 hover:bg-red-500/40 text-red-300 font-medium py-2 px-3 rounded-lg text-sm transition-all duration-200 flex items-center space-x-1"
                        >
                          <span>🗑️</span>
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieManagement;
