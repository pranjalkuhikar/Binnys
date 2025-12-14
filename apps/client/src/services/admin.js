import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const admin = createApi({
  reducerPath: "admin",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
    }),
    profile: builder.query({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
    }),
    createMovie: builder.mutation({
      query: (body) => ({
        url: "/admin/movies",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AdminMovie"],
    }),
    updateMovie: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/movies/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["AdminMovie"],
    }),
    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `/admin/movies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminMovie"],
    }),
    getMovies: builder.query({
      query: (adminId) =>
        adminId ? `/movie?adminId=${adminId}` : "/admin/movies",
      providesTags: ["AdminMovie"],
    }),
    getMovieById: builder.query({
      query: (id) => `/admin/movies/${id}`,
      providesTags: (result, error, id) => [{ type: "AdminMovie", id }],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useProfileQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
  useGetMoviesQuery,
  useGetMovieByIdQuery,
} = admin;
