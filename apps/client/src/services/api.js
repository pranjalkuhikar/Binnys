import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ page, limit, search, isFeatured }) =>
        `movies?page=${page}&limit=${limit}${search ? `&search=${search}` : ""}${isFeatured ? `&isFeatured=${isFeatured}` : ""}`,
    }),
    getMovieById: builder.query({
      query: (id) => `/movies/${id}`,
    }),
    getTvShows: builder.query({
      query: ({ page, limit, sort, order, genre }) => ({
        url: `/tvshows?page=${page}&limit=${limit}&sort=${sort}&order=${order}${genre ? `&genre=${genre}` : ""}`,
        method: "GET",
      }),
    }),
    getTvShowById: builder.query({
      query: (id) => `/tvshows/${id}`,
    }),
    getUniqueTvShowGenres: builder.query({
      query: () => "/tvshows/genres",
    }),
    searchContent: builder.query({
      query: (query) => `/search?query=${query}`,
    }),
    getAdminMovieById: builder.query({
      query: (id) => `/admin/movies/${id}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieByIdQuery,
  useGetTvShowsQuery,
  useGetTvShowByIdQuery,
  useGetUniqueTvShowGenresQuery,
  useSearchContentQuery,
  useAdminMovieByIdQuery,
} = api;
