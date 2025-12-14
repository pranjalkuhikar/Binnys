import Movie from "../models/Movie.js";

export const createMovie = async (req, res) => {
  try {
    const movie = new Movie({ ...req.body, adminId: req.user._id });
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMovies = async (req, res) => {
  try {
    const { adminId } = req.query;
    const filter = adminId ? { adminId } : {};
    const movies = await Movie.find(filter);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = {
      plot: req.body.plot,
      genres: req.body.genres,
      runtime: req.body.runtime,
      rated: req.body.rated,
      poster: req.body.poster,
      cast: req.body.cast,
      num_mflix_comments: req.body.num_mflix_comments,
      title: req.body.title,
      fullplot: req.body.fullplot,
      languages: req.body.languages,
      released: req.body.released,
      directors: req.body.directors,
      writers: req.body.writers,
      year: req.body.year,
      type: req.body.type,
      isFeatured: req.body.isFeatured,
      imdbRating: req.body.imdbRating,
      language: req.body.language,
      officialSite: req.body.officialSite,
      status: req.body.status,
      rating: req.body.rating,
      network: req.body.network,
    };

    const movie = await Movie.findOneAndUpdate(
      { _id: id, adminId: req.user._id },
      { $set: updateFields },
      { new: true, runValidators: true }
    );
    if (!movie) {
      return res
        .status(404)
        .json({ message: "Movie not found or not authorized" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findOneAndDelete({
      _id: id,
      adminId: req.user._id,
    });
    if (!movie) {
      return res
        .status(404)
        .json({ message: "Movie not found or not authorized" });
    }
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
