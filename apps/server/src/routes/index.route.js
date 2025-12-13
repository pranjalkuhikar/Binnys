import express from "express";
import movieRouter from "./movie.route.js";
const router = express.Router();

router.use("/v1", movieRouter);

export default router;
