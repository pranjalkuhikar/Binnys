import axios from "axios";

export const searchContent = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Fetch movies
    const moviesResponse = await axios.get("https://api.tvmaze.com/shows");
    const allMovies = moviesResponse.data;

    const filteredMovies = allMovies.filter(
      (show) =>
        show.name.toLowerCase().includes(query.toLowerCase()) ||
        (show.summary && show.summary.toLowerCase().includes(query.toLowerCase()))
    ).map((show) => ({
      _id: show.id,
      title: show.name,
      year: show.premiered ? new Date(show.premiered).getFullYear() : "N/A",
      plot: show.summary ? show.summary.replace(/<[^>]*>?/gm, "") : "N/A",
      genres: show.genres || [],
      poster: show.image ? show.image.original : "",
      type: "movie",
    }));

    // Fetch TV shows
    const tvShowsResponse = await axios.get("https://api.tvmaze.com/shows");
    const allTvShows = tvShowsResponse.data;

    const filteredTvShows = allTvShows.filter(
      (show) =>
        show.name.toLowerCase().includes(query.toLowerCase()) ||
        (show.summary && show.summary.toLowerCase().includes(query.toLowerCase()))
    ).map((show) => ({
      _id: show.id,
      title: show.name,
      year: show.premiered ? new Date(show.premiered).getFullYear() : "N/A",
      plot: show.summary ? show.summary.replace(/<[^>]*>?/gm, "") : "N/A",
      genres: show.genres || [],
      poster: show.image ? show.image.original : "",
      type: "tvshow",
    }));

    const searchResults = [...filteredMovies, ...filteredTvShows];

    res.status(200).json({ results: searchResults });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};