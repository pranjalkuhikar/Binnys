import express from "express";
import {
  getAllTvShows,
  getTvShowById,
  getUniqueTvShowGenres,
} from "../controllers/tvshow.controller.js";

const router = express.Router();

router.get("/", getAllTvShows);
router.get("/genres", getUniqueTvShowGenres);
router.get("/:id", getTvShowById);

export default router;
