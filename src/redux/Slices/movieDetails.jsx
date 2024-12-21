import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getmovieDtails = createAsyncThunk(
  "movieDetails",
  async (movie, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${movie}`,
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

export const getMovieCast = createAsyncThunk(
  "Movie Cast",
  async (movie, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${movie}/credits`,
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
  MovieDetails: null,
  MovieCast: null,

  loading: true,
  error: null,
};

const movies = createSlice({
  name: "movieDetails",
  initialState: data,
  extraReducers: (builder) => {
    builder.addCase(getmovieDtails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getmovieDtails.fulfilled, (state, action) => {
      state.MovieDetails = action.payload;
      state.loading = false;
    });
    builder.addCase(getmovieDtails.rejected, (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    });

    // Cast Movie

    builder.addCase(getMovieCast.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMovieCast.fulfilled, (state, action) => {
      state.MovieCast = action.payload;
      state.loading = false;
    });
    builder.addCase(getMovieCast.rejected, (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    });
  },
});

export const movieDetails = movies.reducer;
