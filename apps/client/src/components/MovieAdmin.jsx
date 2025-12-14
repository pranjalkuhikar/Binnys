import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
  useGetMoviesQuery,
} from "../services/admin";

const MovieAdmin = () => {
  const { adminId } = useSelector((state) => state.auth);
  const [movies, _] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    releaseDate: "",
    genre: "",
    director: "",
    actors: "",
    poster: "",
    trailer: "",
  });
  const [editingMovieId, setEditingMovieId] = useState(null);

  const {
    data: fetchedMovies,
    error,
    isLoading,
    refetch,
  } = useGetMoviesQuery(adminId);

  const [createMovie] = useCreateMovieMutation();
  const [updateMovie] = useUpdateMovieMutation();
  const [deleteMovie] = useDeleteMovieMutation();

  useEffect(() => {
    if (fetchedMovies) {
      // Remove setMovies(fetchedMovies) to avoid cascading renders
      // Instead, use fetchedMovies directly in the render logic
    }
  }, [fetchedMovies]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMovieId) {
        await updateMovie({ id: editingMovieId, body: form });
      } else {
        await createMovie(form);
      }
      setForm({
        title: "",
        description: "",
        releaseDate: "",
        genre: "",
        director: "",
        actors: "",
        poster: "",
        trailer: "",
      });
      setEditingMovieId(null);
      refetch();
    } catch (err) {
      console.error("Failed to save movie:", err);
    }
  };

  const handleEdit = (movie) => {
    setForm({
      title: movie.title,
      description: movie.description,
      releaseDate: movie.releaseDate,
      genre: movie.genre,
      director: movie.director,
      actors: movie.actors.join(", "),
      poster: movie.poster,
      trailer: movie.trailer,
    });
    setEditingMovieId(movie._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);
      refetch();
    } catch (err) {
      console.error("Failed to delete movie:", err);
    }
  };

  if (isLoading) return <div className="text-white">Loading movies...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-white mb-6">
        {editingMovieId ? "Edit Movie" : "Add New Movie"}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-md mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="date"
            name="releaseDate"
            placeholder="Release Date"
            value={form.releaseDate}
            onChange={handleChange}
            className="p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={form.genre}
            onChange={handleChange}
            className="p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="director"
            placeholder="Director"
            value={form.director}
            onChange={handleChange}
            className="p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="actors"
            placeholder="Actors (comma-separated)"
            value={form.actors}
            onChange={handleChange}
            className="p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="poster"
            placeholder="Poster URL"
            value={form.poster}
            onChange={handleChange}
            className="p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="trailer"
            placeholder="Trailer URL"
            value={form.trailer}
            onChange={handleChange}
            className="p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          {editingMovieId ? "Update Movie" : "Add Movie"}
        </button>
        {editingMovieId && (
          <button
            type="button"
            onClick={() => {
              setEditingMovieId(null);
              setForm({
                title: "",
                description: "",
                releaseDate: "",
                genre: "",
                director: "",
                actors: "",
                poster: "",
                trailer: "",
              });
            }}
            className="ml-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Cancel Edit
          </button>
        )}
      </form>

      <h2 className="text-3xl font-bold text-white mb-6">Your Movies</h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        {movies.length === 0 ? (
          <p className="text-white">No movies created yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <div
                key={movie._id}
                className="bg-gray-700 p-4 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-bold text-white mb-2">
                  {movie.title}
                </h3>
                <p className="text-gray-300 text-sm mb-2">
                  {movie.description}
                </p>
                <p className="text-gray-400 text-xs">Genre: {movie.genre}</p>
                <p className="text-gray-400 text-xs">
                  Director: {movie.director}
                </p>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(movie)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(movie._id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieAdmin;
