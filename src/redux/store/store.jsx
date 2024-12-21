import { configureStore } from "@reduxjs/toolkit";
import { homeMovies } from "../Slices/homeMovies";
import { homeSeries } from "../Slices/homeSeries";
import { movieDetails } from "../Slices/movieDetails";
import { movieReviews } from "../Slices/movieReview";
import { movieSearch } from "../Slices/movieSearch";
import { seriesDetails } from "../Slices/seriesDetails";
import { seriesReview } from "../Slices/seriesReview";
import { videos } from "../Slices/videos";
import { personDetails } from "../Slices/person";

export const Store = configureStore({
  reducer: {
    homeMovies,
    homeSeries,
    movieDetails,
    movieReviews,
    movieSearch,
    seriesDetails,
    seriesReview,
    videos,
    personDetails,
  },
});
