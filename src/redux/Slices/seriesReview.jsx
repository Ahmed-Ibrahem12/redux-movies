import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSeriesReviews = createAsyncThunk(
  "Series review",
  async (series, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let data = await axios({
        method: "GET",
        url: `

https://api.themoviedb.org/3/tv/${series}/reviews`,
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
export const getSeriesRecommend = createAsyncThunk(
  "Series recommend",
  async (series, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let data = await axios({
        method: "GET",
        url: `
https://api.themoviedb.org/3/tv/${series}/recommendations`,
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
  SeriesReview: null,
  SeriesRecommend: null,
  loading: true,
  error: null,
  number: null,
};

const reviews = createSlice({
  name: "serieReviews",
  initialState: data,
  reducers: {
    increment: (state) => {
      state.number++;
    },
  },
  extraReducers: (builder) => {
    // Serie Review
    builder.addCase(getSeriesReviews.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSeriesReviews.fulfilled, (state, action) => {
      state.SeriesReview = action.payload;
      state.loading = false;
    });
    builder.addCase(getSeriesReviews.rejected, (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    });

    // Serie Recommend

    builder.addCase(getSeriesRecommend.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSeriesRecommend.fulfilled, (state, action) => {
      state.SeriesRecommend = action.payload;
      state.loading = false;
    });
    builder.addCase(getSeriesRecommend.rejected, (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    });
  },
});

export const { increment } = reviews.actions;
export const seriesReview = reviews.reducer;
