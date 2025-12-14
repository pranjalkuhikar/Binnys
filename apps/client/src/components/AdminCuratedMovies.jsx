import { useGetMoviesQuery } from "../services/admin";
import MovieCard from "./MovieCard";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

const AdminCuratedMovies = () => {
  const { data: movies, isLoading, error } = useGetMoviesQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorMessage message={error.message || "Failed to fetch admin movies"} />
    );
  }

  if (!movies) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        <p>No movies data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto p-4">
        <h1
          className="text-4xl font-bold mb-8 text-center"
          style={{ color: "var(--color-primary-text)" }}
        >
          Movie List
        </h1>

        {movies.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No admin movies found
            </h3>
            <p className="text-gray-500">
              It looks like no movies have been added by administrators yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} isAdminMovie={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCuratedMovies;
