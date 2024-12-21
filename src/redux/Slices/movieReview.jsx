import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMovieReviews = createAsyncThunk(
  "Movie review",
  async (movie, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let data = await axios({
        method: "GET",
        url: `
https://api.themoviedb.org/3/movie/${movie}/reviews`,
        params: {
          language: "en-US",
          page: "1",
        },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjk0MGJhOTFiYTczZWE4ODk2ODc2MGI5N2I2ODI3MiIsIm5iZiI6MTczMTk4MzI5My44NDM4MTEzLCJzdWIiOiI2NzNiZjY5ODc4ZjBjZDQ4OTE3Mzg4NWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1qcUhTf8WStDm0kgor2TJMhwIZE8RvFlgAXwQlxby7M",
        },
      });
      return data.data;
    } catch (er) {
      return rejectWithValue(er.message);
    }
  }
);
export const getMovieRecommend = createAsyncThunk(
  "Movie recommend",
  async (movie, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let data = await axios({
        method: "GET",
        url: `
https://api.themoviedb.org/3/movie/${movie}/recommendations`,
        params: {
          language: "en-US",
          page: "1",
        },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjk0MGJhOTFiYTczZWE4ODk2ODc2MGI5N2I2ODI3MiIsIm5iZiI6MTczMTk4MzI5My44NDM4MTEzLCJzdWIiOiI2NzNiZjY5ODc4ZjBjZDQ4OTE3Mzg4NWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1qcUhTf8WStDm0kgor2TJMhwIZE8RvFlgAXwQlxby7M",
        },
      });
      return data.data;
    } catch (er) {
      return rejectWithValue(er.message);
    }
  }
);

let data = {
  name: "movies",
  MovieReview: null,
  MovieRecommend: null,
  loading: true,
  error: null,
  number: null,
};

const reviews = createSlice({
  name: "movieReviews",
  initialState: data,
  reducers: {
    increment: (state) => {
      state.number++;
    },
  },
  extraReducers: (builder) => {
    // Movie Review
    builder.addCase(getMovieReviews.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMovieReviews.fulfilled, (state, action) => {
      state.MovieReview = action.payload;
      state.loading = false;
    });
    builder.addCase(getMovieReviews.rejected, (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    });
    // Movie Recommend
    builder.addCase(getMovieRecommend.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMovieRecommend.fulfilled, (state, action) => {
      state.MovieRecommend = action.payload;
      state.loading = false;
    });
    builder.addCase(getMovieRecommend.rejected, (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    });
  },
});

export const { increment } = reviews.actions;
export const movieReviews = reviews.reducer;
