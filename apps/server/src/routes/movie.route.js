import express from "express";
import { getAllMovies } from "../controllers/movie.controller.js";
// import { authenticate } from "../middlewares/auth.middleware.js";
// import { validate } from "../middlewares/validation.middleware.js";
// import { postSchema } from "../validations/post.validation.js";

const router = express.Router();

router.get("/movies", getAllMovies);

export default router;
