import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getHomeMovies = createAsyncThunk(
  "movies",
  async (pageNum = 1, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let data = await axios({
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/now_playing",
        params: { language: "en-US", page: pageNum },
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
export const getReviewMovies = createAsyncThunk(
  "movies",
  async (pageNum = 1, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let data = await axios({
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/now_playing",
        params: { language: "en-US", page: pageNum },
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
  HomeMovies: null,
  loading: true,
  error: null,
  number: 1,
};

const movies = createSlice({
  name: "movies",
  initialState: data,
  reducers: {
    increment: (state) => {
      if (state.number < 500) {
        state.number++;
      }
    },
    decrement: (state) => {
      if (state.number > 0) {
        state.number--;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHomeMovies.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getHomeMovies.fulfilled, (state, action) => {
      state.HomeMovies = action.payload;
      state.loading = false;
    });
    builder.addCase(getHomeMovies.rejected, (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    });
  },
});

export const homeMovies = movies.reducer;

export const { increment, decrement } = movies.actions;
