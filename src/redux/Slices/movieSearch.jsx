import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSearchMovie = createAsyncThunk(
  "SearchMovie",
  async (text, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let data = await axios({
        method: "GET",
        url: `
https://api.themoviedb.org/3/search/movie`,
        params: {
          language: "en-US",
          page: "1",
          query: text,
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
export const getSearchSeries = createAsyncThunk(
  "SearchSeries",
  async (text, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let data = await axios({
        method: "GET",
        url: `

https://api.themoviedb.org/3/search/tv`,
        params: {
          language: "en-US",
          page: "1",
          query: text,
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
  name: "SearchMovie",
  SearchMovie: null,
  SearchSeries: null,
  change: true,

  num: 1,
  loading: true,
  error: null,
};

const MovieSearch = createSlice({
  name: "movieReviews",
  initialState: data,
  reducers: {
    changeNum: (state) => {
      state.num++;
    },
    changeBtn: (state) => {
      state.change = !state.change;
    },
  },
  extraReducers: (builder) => {
    // Movie Search
    builder.addCase(getSearchMovie.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSearchMovie.fulfilled, (state, action) => {
      state.SearchMovie = action.payload;
      state.loading = false;
    });
    builder.addCase(getSearchMovie.rejected, (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    });

    // Movie Search

    builder.addCase(getSearchSeries.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSearchSeries.fulfilled, (state, action) => {
      state.SearchSeries = action.payload;
      state.loading = false;
    });
    builder.addCase(getSearchSeries.rejected, (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    });
  },
});

export const movieSearch = MovieSearch.reducer;
export const { changeNum, changeBtn } = MovieSearch.actions;
