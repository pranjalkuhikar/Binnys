import express from "express";
import {
  createMovie,
  getMovies,
  updateMovie,
  deleteMovie,
  getMovieById,
} from "../controllers/movie.admin.controller.js";
import {
  authenticate,
  authorizeRoles,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, authorizeRoles("admin"), createMovie);
router.get("/", getMovies);
router.put("/:id", authenticate, authorizeRoles("admin"), updateMovie);
router.delete("/:id", authenticate, authorizeRoles("admin"), deleteMovie);
router.get("/:id", getMovieById);

export default router;
