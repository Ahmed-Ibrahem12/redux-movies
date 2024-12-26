import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import ShowMovie from "./pages/ShowMovie";
import ShowSeries from "./pages/ShowSeries";
import PersonDetails from "./pages/PersonDetails";
import CastMovie from "./pages/CastMovie";
import CastSeries from "./pages/CastSeries";

const App = () => {
  return (
    <div>
      <Header />
      <div className="text-center flex justify-center items-center flex-col  bg-black text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/series" element={<Series />} />
          <Route path="/movies/:movieId" element={<ShowMovie />} />
          <Route path="/person/:personId" element={<PersonDetails />} />
          <Route path="/series/:seriesId" element={<ShowSeries />} />
          <Route path="/castmovie/:MovieId" element={<CastMovie />} />
          <Route path="/castserie/:SeriesId" element={<CastSeries />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
