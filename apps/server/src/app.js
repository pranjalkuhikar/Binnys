import express from "express";
import dotenv from "dotenv";
import { getAllMovies } from "./controllers/movieController.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/movies", getAllMovies);

export default app;
