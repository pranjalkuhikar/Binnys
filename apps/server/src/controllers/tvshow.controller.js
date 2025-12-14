import axios from "axios";

export const getUniqueTvShowGenres = async (req, res) => {
  try {
    const response = await axios.get("https://api.tvmaze.com/shows");
    const allShows = response.data;
    const genres = new Set();
    allShows.forEach((show) => {
      show.genres.forEach((genre) => genres.add(genre));
    });
    const genresArray = Array.from(genres);

    res.status(200).json(genresArray);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTvShows = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 18; // Default to 18 items per page
    const sort = req.query.sort || "_id"; // Default sort by _id
    const order = req.query.order === "desc" ? -1 : 1; // Default order ascending
    const search = req.query.search; // Get search term from query
    const genre = req.query.genre; // Get genre from query

    const response = await axios.get("https://api.tvmaze.com/shows");
    let allShows = response.data;

    // Apply search filter
    if (search) {
      allShows = allShows.filter(
        (show) =>
          show.name.toLowerCase().includes(search.toLowerCase()) ||
          (show.summary &&
            show.summary.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Apply genre filter
    if (genre) {
      allShows = allShows.filter((show) => show.genres.includes(genre));
    }

    // Apply sorting
    allShows.sort((a, b) => {
      let valA = a[sort];
      let valB = b[sort];

      // Handle nested properties for sorting (e.g., imdb.rating)
      if (sort.includes(".")) {
        const [parent, child] = sort.split(".");
        valA = a[parent] ? a[parent][child] : undefined;
        valB = b[parent] ? b[parent][child] : undefined;
      }

      // Handle undefined or null values for sorting
      if (valA === undefined || valA === null) return order;
      if (valB === undefined || valB === null) return -order;

      if (typeof valA === "string") {
        return order * valA.localeCompare(valB);
      }
      if (typeof valA === "number") {
        return order * (valA - valB);
      }
      return 0;
    });

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedShows = allShows.slice(startIndex, endIndex);

    const tvShows = paginatedShows.map((show) => ({
      _id: show.id,
      title: show.name,
      year: show.premiered ? new Date(show.premiered).getFullYear() : "N/A",
      plot: show.summary ? show.summary.replace(/<[^>]*>?/gm, "") : "N/A",
      genres: show.genres || [],
      poster: show.image ? show.image.original : "",
      imdb: { rating: show.rating ? show.rating.average : "N/A" }, // Include imdb rating for sorting
    }));

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(allShows.length / limit),
      totalItems: allShows.length,
      tvShows,
    });
  } catch (error) {
    console.error("Error in getAllTvShows:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getTvShowById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
    const show = response.data;

    if (!show) {
      return res.status(404).json({ message: "TV Show not found" });
    }

    const tvShow = {
      _id: show.id,
      title: show.name,
      year: show.premiered ? new Date(show.premiered).getFullYear() : "N/A",
      plot: show.summary ? show.summary.replace(/<[^>]*>?/gm, "") : "N/A",
      genres: show.genres || [],
      cast:
        show._embedded && show._embedded.cast
          ? show._embedded.cast.map((member) => member.person.name)
          : [],
      director:
        show._embedded && show._embedded.crew
          ? show._embedded.crew
              .filter((member) => member.type === "Director")
              .map((member) => member.person.name)
              .join(", ")
          : "N/A",
      imdb: { rating: show.rating ? show.rating.average : "N/A" },
      poster: show.image ? show.image.original : "",
      status: show.status || "N/A",
      language: show.language || "N/A",
      network: show.network && show.network.name ? show.network.name : "N/A",
      officialSite: show.officialSite || "N/A",
      runtime: show.runtime || "N/A",
      seasons:
        show._embedded && show._embedded.seasons
          ? show._embedded.seasons.map((season) => ({
              id: season.id,
              number: season.number,
              premiereDate: season.premiereDate,
              endDate: season.endDate,
              episodeOrder: season.episodeOrder,
            }))
          : [],
    };

    res.status(200).json(tvShow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
