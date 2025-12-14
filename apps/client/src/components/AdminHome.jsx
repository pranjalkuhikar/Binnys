import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminMovies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/movies",
          {
            withCredentials: true,
          }
        );
        setMovies(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch your movies");
        setLoading(false);
      }
    };
    fetchAdminMovies();
  }, []);

  const handleEdit = (movie) => {
    // Navigate to movie management page with movie data to edit
    navigate("/admin/movies", { state: { movieToEdit: movie } });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        await axios.delete(`http://localhost:3000/api/admin/movies/${id}`, {
          withCredentials: true,
        });
        // Refresh the movie list
        const response = await axios.get(
          "http://localhost:3000/api/admin/movies",
          {
            withCredentials: true,
          }
        );
        setMovies(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete movie");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-linear-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/30">
        <h2 className="text-3xl font-bold text-white mb-4">
          Welcome to Your Admin Dashboard
        </h2>
        <p className="text-gray-300 text-lg">
          Manage your movie collection and track your content performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Movies</p>
              <p className="text-3xl font-bold text-white">{movies.length}</p>
            </div>
            <div className="text-3xl">🎬</div>
          </div>
        </div>
        <div className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Featured Movies</p>
              <p className="text-3xl font-bold text-white">
                {movies.filter((m) => m.isFeatured).length}
              </p>
            </div>
            <div className="text-3xl">⭐</div>
          </div>
        </div>
        <div className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Recent Releases</p>
              <p className="text-3xl font-bold text-white">
                {
                  movies.filter((m) => m.year >= new Date().getFullYear() - 1)
                    .length
                }
              </p>
            </div>
            <div className="text-3xl">🆕</div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      {/* Movies Section */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Your Movies</h3>
          <Link
            to="/admin/movies"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <span>➕</span>
            <span>Add New Movie</span>
          </Link>
        </div>

        {movies.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎬</div>
            <h4 className="text-xl font-semibold text-gray-400 mb-2">
              No movies yet
            </h4>
            <p className="text-gray-500 mb-4">
              Start building your movie collection!
            </p>
            <Link
              to="/admin/movies"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Create Your First Movie
            </Link>
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
                  <h4 className="text-lg font-bold text-white mb-1 line-clamp-1">
                    {movie.title}
                  </h4>
                  <p className="text-gray-400 text-sm mb-2">{movie.year}</p>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                    {movie.plot?.substring(0, 80)}...
                  </p>
                  <div className="flex items-center justify-between">
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
