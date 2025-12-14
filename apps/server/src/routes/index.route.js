import express from "express";
import movieRoutes from "./movie.route.js";
import tvShowRoutes from "./tvshow.route.js";
import searchRoutes from "./search.route.js";
import userRoutes from "./user.route.js";
import movieAdminRoutes from "./movie.admin.route.js";

const router = express.Router();

router.use("/movies", movieRoutes);
router.use("/tvshows", tvShowRoutes);
router.use("/search", searchRoutes);
router.use("/users", userRoutes);
router.use("/admin/movies", movieAdminRoutes);

export default router;
