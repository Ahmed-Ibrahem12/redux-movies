import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMoviesVideos = createAsyncThunk(
  "movies Videos",
  async (movie, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${movie}/videos`,
        params: {
          language: "en-US",
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

export const getSeriesVideos = createAsyncThunk(
  "Series Videos",
  async (series, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/tv/${series}/videos`,
        params: {
          language: "en-US",
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
  MoviesVideo: null,
  SeriesVideo: null,

  loading: true,
  error: null,
};

const Videos = createSlice({
  name: "movieDetails",
  initialState: data,
  extraReducers: (builder) => {
    // Movies Videos
    builder.addCase(getMoviesVideos.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMoviesVideos.fulfilled, (state, action) => {
      state.MoviesVideo = action.payload;
      state.loading = false;
    });
    builder.addCase(getMoviesVideos.rejected, (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    });

    // Series Videos

    builder.addCase(getSeriesVideos.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSeriesVideos.fulfilled, (state, action) => {
      state.SeriesVideo = action.payload;
      state.loading = false;
    });
    builder.addCase(getSeriesVideos.rejected, (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    });
  },
});

export const videos = Videos.reducer;
