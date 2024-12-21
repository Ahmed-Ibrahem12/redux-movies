import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPersonDetails = createAsyncThunk(
  "moviePerson",
  async (person, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/person/${person}`,
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
export const getPersonRecommend = createAsyncThunk(
  "Person Recommendation",
  async (person, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/person/${person}/movie_credits`,
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
  name: "person",
  PersonDetails: null,
  PersonRecommend: null,
  loading: true,
  error: null,
};

const person = createSlice({
  name: "movieDetails",
  initialState: data,
  extraReducers: (builder) => {
    builder.addCase(getPersonDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPersonDetails.fulfilled, (state, action) => {
      state.PersonDetails = action.payload;
      state.loading = false;
    });
    builder.addCase(getPersonDetails.rejected, (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    });

    // Person Recommend

    builder.addCase(getPersonRecommend.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPersonRecommend.fulfilled, (state, action) => {
      state.PersonRecommend = action.payload;
      state.loading = false;
    });
    builder.addCase(getPersonRecommend.rejected, (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    });
  },
});

export const personDetails = person.reducer;
