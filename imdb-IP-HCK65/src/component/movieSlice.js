import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  loading: true,
  error: null,
  page: 1,
  totalPages: 1,
  maxPages: 5,
  searchTerm: "",
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  setMovies,
  setLoading,
  setError,
  setPage,
  setTotalPages,
  setSearchTerm,
} = movieSlice.actions;

export default movieSlice.reducer;
