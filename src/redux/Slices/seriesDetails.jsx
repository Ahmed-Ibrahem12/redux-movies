import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSeriesDetails = createAsyncThunk(
  "SeriesDitails",
  async (series, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/tv/${series}`,
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

export const getSeriesCast = createAsyncThunk(
  "Series Cast",
  async (series, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/tv/${series}/credits`,
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
  name: "series",
  SeriesDetails: null,
  SeriesCast: null,

  loading: true,
  error: null,
};

const series = createSlice({
  name: "seriesDetails",
  initialState: data,
  extraReducers: (builder) => {
    builder.addCase(getSeriesDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSeriesDetails.fulfilled, (state, action) => {
      state.SeriesDetails = action.payload;
      state.loading = false;
    });
    builder.addCase(getSeriesDetails.rejected, (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    });

    // Cast Series

    builder.addCase(getSeriesCast.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSeriesCast.fulfilled, (state, action) => {
      state.SeriesCast = action.payload;
      state.loading = false;
    });
    builder.addCase(getSeriesCast.rejected, (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    });
  },
});

export const seriesDetails = series.reducer;
